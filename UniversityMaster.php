<?php
class BaseApp_Synchronizer_UniversityMaster extends BaseApp_Synchronizer_Base
{
    const UNIVERSITY_TEMP_COLLECTION = 'UniversityMasterTempRevamp';

    protected $_dao = 'University';
    private $_cityWiseBenifit = array();
    private $_countryWiseDisabledBenifit = array();
    private $_countryWiseBenefit = array();
    const KEY_BUNDLEBENEFITS = "bundleBenefits";
    private $_applicationProductSectionData = array();

    private function getApplicationProductSectionData()
    {
        $sectionTypes = [
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_LEARNER_INTRO,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_INDUSTRY,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_WORK_EXPERIENCE,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_EDUCATIONAL,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_ADMISSION_PROCESS,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_ADMISSION_ELIGIBILITY,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_ADMISSION_COUNSELORS,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_FINANCIAL_INTRO,
            BaseApp_Dao_ApplicationSectionData::SECTION_TYPE_APP_PROGRAM_BENEFITS
        ];

        $appSectionObj = new BaseApp_Dao_ApplicationSectionData();
        $productSectionData = $appSectionObj->getApplicationData(BaseApp_Dao_ApplicationSectionData::TYPE_BUNDLE, $sectionTypes);
        $productSectionData = $appSectionObj->prepareCronData($productSectionData);
        $this->_applicationProductSectionData = $productSectionData;
    }

    public function getData()
    {
        $db = $this->getDao()->getDb();

        // Fetch ApplicationProductSectionData
        $this->getApplicationProductSectionData();

        $all_univerities_sql = $db
            ->select()
            ->distinct()
            ->from(array('b' => 'bundles'), array('*'))
            ->joinLeft(array('i' => 'images'), 'i.linkable_id = b.bundle_id AND i.linkable_type = "bundle" AND i.name = "home_page_tumbnail_image"', array('home_page_tumbnailImage' => 'i.imagePath'))
            ->where('b.master_type = ?', BaseApp_Dao_Bundles::MASTER_TYPE_UNIVERSITY)
            ->where('b.status = ?', 1);

        $all_univerties = array();
        $all_univerties = $db->fetchAll($all_univerities_sql);
        $bundleIds = array();

        //industry trends
        $industryObj = new BaseApp_Synchronizer_Helper_BundleHelper();
        $industryInfo = $industryObj->_industrySection($db);
        $this->_setIndustrySection($industryInfo);

        foreach ($all_univerties as $key => $id) {
            $bundleIds[] = !empty($id['bundle_id']) ? $id['bundle_id'] : "";
        }
        $bundleUniversities = $this->_getAllBundleUniversities();

        /**
         *bundlesProgramIntro Data
         */
        $bundlesProgramIntroData = $industryObj->programIntroData($db,$bundleIds);

        /**
         * project section
         */
        $projects = $industryObj->handleCourseIndustryProjects($db,$bundleIds);
        $appSectionObj = new BaseApp_Dao_ApplicationSectionData();
        foreach ($all_univerties as $university) {
            $universityName = !empty($bundleUniversities['content']) ? $bundleUniversities['content'] : array();
            $bundleUniversity = (!empty($universityName[$university['bundle_id']])) ? $universityName[$university['bundle_id']] : array();
            $bundleId = $university['bundle_id'];
            $skillSet = $industryObj->_programSkillSets($db,$bundleId);
            //Get Bundle Benefit Data
            $commonBenefitData = $this->_getCourseBenefitData($university['bundle_id']);
            $projectData =  $industryObj->getBundleProjectsData($bundleId,$projects);
            /**
             * program advantage section
             */
            $programAdvantageSection = $industryObj->getBundlesAdvantageData($bundlesProgramIntroData,$university['bundle_id']);

            $data[$university['bundle_id']] = array(
                'product_id' => (int) $bundleId,
                'country_id' => null,
                'home_page_tumnail_image' => $university['home_page_tumbnailImage'] ? $university['home_page_tumbnailImage'] : null,
                'university' => $bundleUniversity,
                'bundleBenefits' => !empty($commonBenefitData) ? $commonBenefitData : array(),
                'simplilearn_advantage'=> $programAdvantageSection,
                'industry_projects'=>!empty($projectData)?$projectData:null,
                'skills_covered' => !empty($skillSet)? $skillSet:array()
            );
            // Append application section data
            if (!empty($this->_applicationProductSectionData[$bundleId])) {
                $univAdmiData = $this->_applicationProductSectionData[$bundleId];
                $univAdmissionData = $appSectionObj->prepareMongoData($univAdmiData,$bundleId);
                foreach ($univAdmissionData as $key => $value) {
                    $data[$bundleId][$key] = $value;
                }
            }
        }
        $contrySpecificData = $this->_getContrySpecificData($bundleIds);
        $data = (array_merge($data, $contrySpecificData));
        pr("Time: " . date('Y-m-d H:i:s') . ", Processing done");
        return $data;
    }


    private function _getAllBundleUniversities()
    {
        $bundleUniversityInfo = array();
        $db = $this->getDao()->getDb();
        $universityMappingSql = $db->select()
            ->from(array('acc' => 'university'), array('*'))
            ->join(array('accMap' => 'university_mapping'), 'accMap.university_id = acc.university_id')
            ->where('accMap.linkable_type IN(?)', array(BaseApp_Dao_ProductTypes::PRODUCT_NAME_FOR_BUNDLES))
            ->where('acc.page_type = ?', BaseApp_Dao_ProductTypes::PRODUCT_NAME_FOR_UNIVERSITY_MASTER)
            ->where('accMap.status <> ?', 0)
            ->where('acc.status <> ?', 0)
            ->order(array('accMap.id ASC'));
        $data = $db->fetchAll($universityMappingSql);
        $universityData = array();
        if (!empty($data)) {
            foreach ($data as $row) {
                $universityData[$row['linkable_id']] = array('name' => !empty($row['name']) ? $row['name'] : "", 'alt_text' => !empty($row['alt_text']) ? $row['alt_text'] : "", 'link' => !empty($row['link']) ? $row['link'] : "", 'university_logo_colored' => !empty($row['university_logo_colored']) ? $row['university_logo_colored'] : "", 'university_logo_bw' => !empty($row['university_logo_bw']) ? $row['university_logo_bw'] : "");
            }
            $bundleUniversityInfo = !empty($universityData) ? $universityData : array();
        }
        return array(
            'content' => !empty($bundleUniversityInfo) ? $bundleUniversityInfo : array()
        );
    }

    private function _getContrySpecificData($bundleIds)
    {
        $db = $this->getDao()->getDb();
        $countrySpecificData =  $db
            ->select()
            ->distinct()
            ->from(array('b' => 'bundles'), array('*'))
            ->join(array('s' => 'subscriptionPricing'), 's.linkable_id = b.bundle_id and s.linkable_type = b.linkable_type', array())
            ->join(array('co' => 'country'), 'co.country_id = s.country_id OR (co.cluster_id != 0 AND co.cluster_id = s.cluster_id)', array('co.country_id'))
            ->where('s.frequency_id IN (?)', array(0, 1))
            ->where('b.status = ?', 1)
            ->where('s.status = ?', 1)
            ->where('s.linkable_id in (?)', $bundleIds)
            ->where('co.status = ?', 1)
            ->where('b.master_type = ?', 1)
            ->where('b.status = ?', 1)
            ->order(array('s.country_id DESC', 's.subscriptionPrice ASC'));
        $unversCountrySpecific =  $db->fetchAll($countrySpecificData);
        $countryData = array();
        foreach ($unversCountrySpecific as $key => $universityCountryData) {
            $countryId = !empty($universityCountryData['country_id']) ? $universityCountryData['country_id'] : "";
            //Get Bundle Benefit Data
            $countryBenefitData = $this->_getCourseBenefitData($universityCountryData['bundle_id'], $universityCountryData['country_id']);
            $countryData[$key] = array(
                'product_id' => (int) $universityCountryData['bundle_id'],
                'country_id' => (int) $universityCountryData['country_id'],
                'bundleBenefits' => !empty($countryBenefitData) ? $countryBenefitData : array()

            );
            if ($countryId == INDIA_COUNTRY_ID) {
                $countryData[$key]['job_assist'] = !empty($universityCountryData['job_assist_for_ind']) ? (int) $universityCountryData['job_assist_for_ind'] : 0;
            }
        }
        return $countryData;
    }

    public function process($data)
    {
        return $data;
    }

    public function saveData($data)
    {
        $db = new Model_Default;
        $collectionName = self::UNIVERSITY_TEMP_COLLECTION;

        if (!$this->_oneAtATime) {
            $db->$collectionName->drop();
            foreach ($data as $row) {
                $db->$collectionName->insert($row);
            }
        } else {
            $db->$collectionName->insert($data);
        }
    }
    private function _setIndustrySection($data)
    {
        $this->_cityWiseBenifit = !empty($data['city']) ? $data['city'] : array();
        $this->_countryWiseDisabledBenifit = !empty($data['disableCountry']) ? $data['disableCountry'] : array();
        $this->_countryWiseBenefit = !empty($data['country']) ? $data['country'] : array();
    }
    private function _getCourseBenefitData($bundleId, $countryId = 0, $cityId = 0)
    {

        $countryId = !empty($countryId) ? $countryId : 0;

        $courseWiseStickyData = array();
        if (!empty($this->_courseStickyData[$bundleId])) {
            $courseWiseStickyData = $this->_courseStickyData[$bundleId];
        }
        $benefitKey = self::KEY_BUNDLEBENEFITS;
        $newTitle = $this->_getStickyDataByKey($courseWiseStickyData, $benefitKey);
        $headerSuffix = 'Benefits';
        if (!empty($newTitle['header_suffix'])) {
            $headerSuffix = $newTitle['header_suffix'];
        }
        if (
            isset($this->_countryWiseBenefit[$bundleId])
            || isset($this->_cityWiseBenifit[$bundleId])
        ) {

            if (empty($cityId) && !empty($countryId) && isset($this->_countryWiseBenefit[$bundleId][$countryId])) {
                $benefit = $this->_countryWiseBenefit[$bundleId][$countryId];
            } else if (!empty($cityId) && empty($countryId) && isset($this->_courseBenefitsCity[$bundleId][$cityId])) {
                $benefit = $this->_cityWiseBenifit[$bundleId][$cityId];
            } else if (empty($cityId) && empty($countryId) && isset($this->_countryWiseBenefit[$bundleId][0])) {
                $benefit = $this->_countryWiseBenefit[$bundleId][0];
            } else {
                return false;
            }
            $benefit = current($benefit);
            $benefitJobData = [];
            //have faq id
            //should get salary and companies according
            if (!empty($benefit)) {
                $courseFaqModel = new BaseApp_Dao_CourseFaq();
                $benefitJobs = $courseFaqModel->getJobsDataForBenefitType($benefit['faq_id'], BaseApp_Dao_ProductTypes::PRODUCT_NAME_FOR_BUNDLES);
                $industryData = $courseFaqModel->getIndustryDataByType($benefit['faq_id'], BaseApp_Dao_ProductTypes::PRODUCT_NAME_FOR_BUNDLES);
                $sessionMapping = new BaseApp_Dao_SectionMapping();
                $hiringData = $sessionMapping->getByProduct($benefit['faq_id'], BaseApp_Dao_SectionMapping::COURSE_FAQ_LINKABLE_TYPE, BaseApp_Dao_ProductSectionData::INDUSTRY_TREND_DESIGNATION);
                $hiringData = !empty($hiringData) ? current($hiringData) : array();
                if (!empty($benefitJobs)) {
                    foreach ($benefitJobs as $key => $job) {
                        $hiringCompanyIds = $job['hiring_companies'];
                        unset($job['hiring_companies']);
                        unset($job['section_map_id']);
                        unset($job['section_id']);
                        $productSectionObj = new BaseApp_Dao_ProductSectionData();
                        foreach ($hiringCompanyIds as $key => $hiringCompanyId) {
                            $productSectionObj->clean();
                            $job['hiring_companies'][$key] = [];
                            $productSection = $productSectionObj->setId($hiringCompanyId);
                            if (!empty($productSection)) {
                                $job['hiring_companies'][$key]['name'] = $productSection['name'];
                                $job['hiring_companies'][$key]['imageUrl'] = $productSection['imageUrl'];
                            }
                        }
                        $job['salary_source'] = 'Glassdoor';
                        $job['hiring_source'] = 'Indeed';
                        $job['companies_label'] =  !empty($hiringData['name']) ? $hiringData['name'] : null;
                        array_push($benefitJobData, $job);
                    }
                }
                return array(
                    // 'key'   => self::KEY_BUNDLEBENEFITS,
                    'content' => array(
                        'header_suffix' => $headerSuffix,
                        'title' => !empty($benefit['title'])?$benefit['title'] :'Industry Trends',
                        'intro' => $benefit['content'],
                        'jobs'  => $benefitJobData,
                        'industry_trends' => $industryData
                    )
                );
            }
        }
        return false;
    }
    function _getStickyDataByKey($courseWiseStickyData, $key)
    {
        $contentTitle = '';
        $stickyCustomData = array();
        if (!empty($courseWiseStickyData[$key])) {
            $stickyData = $courseWiseStickyData[$key];
            if (!empty($stickyData['sticky_title'])) {
                $contentTitle = $stickyData['sticky_title'];
                $stickyOn = $stickyData['sticky_on'];
                $stickyCustomData['sticky_title'] = $contentTitle;
                $stickyCustomData['sticky_on'] = $stickyOn;
            }
            if (!empty($stickyData['header_suffix'])) {
                $stickyCustomData['header_suffix'] = $stickyData['header_suffix'];
            }
        }
        return $stickyCustomData;
    }
}
