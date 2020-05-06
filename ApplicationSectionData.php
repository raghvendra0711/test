<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


class BaseApp_Dao_ApplicationSectionData extends BaseApp_Model
{
    protected $_allowDelete = false;
    protected $_serial = true;
    protected $_name = 'applicationSectionData';
    protected $_pk = 'id';

    const SECTION_TYPE_APP_LEARNER_INTRO = 'app_learner_intro';
    const SECTION_TYPE_APP_INDUSTRY = 'app_industry';
    const SECTION_TYPE_APP_WORK_EXPERIENCE = 'app_work_experience';
    const SECTION_TYPE_APP_EDUCATIONAL = 'app_educational';
    const SECTION_TYPE_APP_ADMISSION_PROCESS = 'app_admission_process';
    const SECTION_TYPE_APP_ADMISSION_ELIGIBILITY = 'app_admission_eligibility';
    const SECTION_TYPE_APP_ADMISSION_COUNSELORS = 'app_admission_counselors';
    const SECTION_TYPE_APP_FINANCIAL_INTRO = 'app_financing_intro';
    const SECTION_TYPE_APP_PROGRAM_BENEFITS = 'app_program_benefits';

    const TYPE_BUNDLE = 'bundle';

    public function getApplicationData($linkableType, $sectionTypes = [],$linkableId = 0)
    {
        $sql = $this->getDb()->select()
            ->from(['asd' => 'applicationSectionData'],'asd.*')
            ->where('asd.linkable_type = ?', $linkableType)
            ->where('asd.status <> ?', 0);

        if (!empty($sectionTypes)) {
            $sql->where('asd.type IN (?)', $sectionTypes);
        }

        if($linkableId){
            $sql->where('asd.linkable_id IN (?)', $linkableId);
        }
        return $this->getDb()->fetchAll($sql);
    }

    public function prepareResponseData($data,$isCron = false)
    {
        $response = array();
        if (empty($data)) {
            return $response;
        }
        try {
            $applicationFieldsMapping = array(
                self::SECTION_TYPE_APP_LEARNER_INTRO => array(
                    'intro' => 'intro'
                ),
                self::SECTION_TYPE_APP_INDUSTRY => array(
                    'intro' => 'intro',
                    'first_sec_title' => 'first_sec_title',
                    'details1' => [],
                    'second_sec_title' => 'second_sec_title',
                    'details2' => []
                ),
                self::SECTION_TYPE_APP_WORK_EXPERIENCE => array(
                    'intro' => 'intro',
                    'first_sec_title' => 'first_sec_title',
                    'details1' => ['designation_data'],
                    'second_sec_title' => 'second_sec_title',
                    'details2' => ['exp_data']
                ),
                self::SECTION_TYPE_APP_EDUCATIONAL => array(
                    'intro' => 'intro',
                    'first_sec_title' => 'first_sec_title',
                    'details1' => ['industry_data'],
                    'second_sec_title' => 'second_sec_title',
                    'details2' => ['college_logos'],
                ),
                self::SECTION_TYPE_APP_ADMISSION_PROCESS => array(
                    'intro' => 'intro',
                    'details1' => [],
                ),
                self::SECTION_TYPE_APP_ADMISSION_ELIGIBILITY => array(
                    'intro' => 'intro',
                    'details1' => [],
                ),
                self::SECTION_TYPE_APP_ADMISSION_COUNSELORS => array(
                    'intro' => 'intro',
                    'details1' => []
                ),
                self::SECTION_TYPE_APP_FINANCIAL_INTRO => array(
                    'intro' => 'intro'
                ),
                self::SECTION_TYPE_APP_PROGRAM_BENEFITS => array(
                    'details1' => []
                )
            );
            foreach ($data as $row) {
                $mappingIndex = $row['type'];
                $linkableId = $row['linkable_id'];
                $id = $row['id'];
                if (!empty($mappingIndex) && array_key_exists($mappingIndex, $applicationFieldsMapping)) {
                    $searchArr = $applicationFieldsMapping[$mappingIndex];
                    if($isCron && ($mappingIndex == self::SECTION_TYPE_APP_WORK_EXPERIENCE || $mappingIndex == self::SECTION_TYPE_APP_EDUCATIONAL)){
                        $details1 = json_decode($row['details1'],true);
                        $key1 = $searchArr['details1'][0];
                        $details2 = json_decode($row['details2'],true);
                        $key2 = $searchArr['details2'][0];
                        if(empty($details1) || empty($details1[$key1]) || empty($details2) || empty($details2[$key2])){
                            continue;
                        }
                    }
                    foreach ($searchArr as $key => $value) {
                        if(!$isCron)
                            $response[$linkableId][$mappingIndex]['id'] = $id;
                        if (!is_array($value)) {
                            $response[$linkableId][$mappingIndex][$value] = $row[$key];
                        } else {
                            $rowNew = json_decode($row[$key], true);
                            foreach ($rowNew as $k => $v) {
                                if($isCron && $k == 'hiring_companies'){
                                    $hiringCompanyIds = $v;
                                    $response[$linkableId][$mappingIndex][$k] = [];
                                    $productSectionObj = new BaseApp_Dao_ProductSectionData();
                                    foreach ($hiringCompanyIds as $key => $hiringCompanyId) {
                                        $productSectionObj->clean();
                                        $productSection = $productSectionObj->setId($hiringCompanyId);
                                        if (!empty($productSection) && !empty($productSection['name']) && !empty($productSection['imageUrl'])) {
                                            $hiringCompany  = array(
                                                'label' => $productSection['name'],
                                                'value' => $productSection['imageUrl'],
                                                'alt' => $productSection['alt_text'],
                                            );
                                            $response[$linkableId][$mappingIndex][$k][] = $hiringCompany;
                                        }
                                    }
                                } else {
                                    $response[$linkableId][$mappingIndex][$k] = $v;

                                }
                            }
                        }
                    }
                }
            }
            return $response;
        } catch (Exception $e) {
            if (APPLICATION_ENV == 'development')
                throw $e;

            return [];
        }
    }

    public function prepareMongoData($data,$bundleId){
        // prd($data);
        $cronFieldMapping = array(
            'pricing' => array(
                'title' => '<b>Admission Fee</b> & Financing',
                'stickyHeading' => 'Pricing',
                'description' => '',
            ),
            'admission_details' => array(
                'title' => "<b>Admission</b> Details",
                'stickyHeading' => 'Admission',
                'application_process' => array(
                    "name" => "APPLICATION PROCESS",
                    "description" => "",
                    "process_points" => array()
                ),
                "eligibility" => array(
                    "name" => "<b>ELIGIBLE CANDIDATES</b>",
                    "description" => "",
                    "eligibility_points" => array(
                        0 => array(
                            "class" => "degree", //deg
                            "text" => ""
                        ),
                        1 => array(
                            "class" => "person", //wke
                            "text" => ""
                        ),
                        2 => array(
                            "class" => "cal", //bconcept
                            "text" => ""
                        ),
                    )
                ),
                "admission_counselors" => array(
                    "name" => "<b>ADMISSION COUNSELORS</b>",
                    "description" => "",
                    "counselors_points" => array()
                )
            ),
            'program_benefits' => array(
                "title" => "<b>PROGRAM BENEFITS</b>",
                "benf_points" => array()
            ),
            'learners_profile' => array(
                'title' => "Learner's <b>Profile</b>",
                'description' => "",
                'tabs' => array()
            )
        );

        if (!empty($data[self::SECTION_TYPE_APP_FINANCIAL_INTRO])) {
            $cronFieldMapping['pricing']['description'] = $data[self::SECTION_TYPE_APP_FINANCIAL_INTRO]['intro'];
        }

        if (!empty($data[self::SECTION_TYPE_APP_PROGRAM_BENEFITS])) {
            $cronFieldMapping['program_benefits']['benf_points'] = array_values($data[self::SECTION_TYPE_APP_PROGRAM_BENEFITS]);
        }

        if (!empty($data[self::SECTION_TYPE_APP_ADMISSION_COUNSELORS])) {
            $counselorData = $data[self::SECTION_TYPE_APP_ADMISSION_COUNSELORS];
            $cronFieldMapping['admission_details']['admission_counselors']['description'] = !empty($counselorData['intro']) ? $counselorData['intro']: "";
            unset($counselorData['intro']);
            $cronFieldMapping['admission_details']['admission_counselors']['counselors_points'] = array_values($counselorData);
        }

        if (!empty($data[self::SECTION_TYPE_APP_ADMISSION_ELIGIBILITY])) {
            $eligibilityData = $data[self::SECTION_TYPE_APP_ADMISSION_ELIGIBILITY];
            $cronFieldMapping['admission_details']['eligibility']['description'] = !empty($eligibilityData['intro']) ? $eligibilityData['intro']:"";
            unset($eligibilityData['intro']);

            $elegpoints = array(
                'work_exp' => array(
                    'text' => !empty($eligibilityData['work_exp'])? $eligibilityData['work_exp']: "", 
                    'class' => 'person',
                    'order' => !empty($eligibilityData['work_exp_order']) ? $eligibilityData['work_exp_order'] : 1
                ),
                'degree' => array(
                    'text' => !empty($eligibilityData['degree']) ? $eligibilityData['degree']: "", 
                    'class' => 'degree',
                    'order' => !empty($eligibilityData['work_exp_order']) ? $eligibilityData['work_exp_order'] : 2
                ),
                'basic_concept' => array(
                    'text' => !empty($eligibilityData['basic_concept']) ? $eligibilityData['basic_concept']: "", 
                    'class' => 'cal',
                    'order' => !empty($eligibilityData['work_exp_order']) ? $eligibilityData['work_exp_order'] : 3
                )
            );
            usort($elegpoints,function($a, $b) {
                return $a['order'] - $b['order'];
            });
            unset(
                $elegpoints[0]['order'],
                $elegpoints[1]['order'],
                $elegpoints[2]['order']
            );
            $cronFieldMapping['admission_details']['eligibility']['eligibility_points'] = $elegpoints;
        }

        if (!empty($data[self::SECTION_TYPE_APP_ADMISSION_PROCESS])) {
            $processData = $data[self::SECTION_TYPE_APP_ADMISSION_PROCESS];
            $cronFieldMapping['admission_details']['application_process']['description'] = !empty($processData['intro']) ? $processData['intro'] :"";
            $processPoints = array(
                0 => array(
                    "name" =>  "Submit Application",
                    "text" => !empty($processData['submit_text']) ? $processData['submit_text'] : ""
                ),
                1 => array(
                    "name" =>  "Application Review",
                    "text" => !empty($processData['review_text']) ? $processData['review_text'] : ""
                ),
                2 => array(
                    "name" =>  "Admission",
                    "text" => !empty($processData['admission_text']) ? $processData['admission_text'] : ""
                )
            );
            $cronFieldMapping['admission_details']['application_process']['process_points'] = $processPoints;
        }

        $tabs = $indDataArr = $workExDataArr = $educationDataArr = array();
        if (
            !empty($data[self::SECTION_TYPE_APP_INDUSTRY]) ||
            !empty($data[self::SECTION_TYPE_APP_WORK_EXPERIENCE]) ||
            !empty($data[self::SECTION_TYPE_APP_EDUCATIONAL])
        
        ) {
            $cronFieldMapping['learners_profile']['description'] = $data[self::SECTION_TYPE_APP_LEARNER_INTRO];
            // prd($data[self::SECTION_TYPE_APP_INDUSTRY]);
            if(!empty($data[self::SECTION_TYPE_APP_INDUSTRY])){
                $indDataAppArr = $data[self::SECTION_TYPE_APP_INDUSTRY];
                $indChartData = !empty($indDataAppArr['industry_data']) ? $indDataAppArr['industry_data'] : array();
                $hrCmpData = !empty($indDataAppArr['hiring_companies']) ? $indDataAppArr['hiring_companies'] : array();
                $chartInfo = $hireInfo = array();
                
                foreach($indChartData as $indChartD){
                    $chartInfo[] = array(
                        'label' => $indChartD['label'],
                        'percent' => $indChartD['value']
                    );
                }

                foreach($hrCmpData as $hrCmpD){
                    $hireInfo[] = array(
                        'image' => $hrCmpD['value'],
                        'label' => $hrCmpD['label'],
                        'alt' => $hrCmpD['label']
                    );
                }

                if(!empty($chartInfo) && !empty($hireInfo)){
                    $indDataArr = array(
                        'title' => "Industry",
                        'description' => !empty($indDataAppArr['intro']) ? $indDataAppArr['intro'] : "",
                        'sections' => array(
                            0 => array(
                                "title" => !empty($indDataAppArr['first_sec_title']) ? $indDataAppArr['first_sec_title'] : "",
                                "type" => "chart",
                                "content" => $chartInfo
                            ),
                            1 => array(
                                "title" => !empty($indDataAppArr['second_sec_title']) ? $indDataAppArr['second_sec_title'] : "",
                                "type" => "collage",
                                "content" => $hireInfo
                            )
                        )
                    );
                }
            }
            
            if(!empty($data[self::SECTION_TYPE_APP_WORK_EXPERIENCE])){
                $wkDataAppArr = $data[self::SECTION_TYPE_APP_WORK_EXPERIENCE];
                $desgnData = !empty($wkDataAppArr['designation_data']) ? $wkDataAppArr['designation_data'] : array();
                $expData = !empty($wkDataAppArr['exp_data']) ? $wkDataAppArr['exp_data'] : array();
                $designationInfo = $experienceInfo = array();
                
                foreach($desgnData as $desgnD){
                    $designationInfo[] = array(
                        'label' => $desgnD['label'],
                        'percent' => $desgnD['value']
                    );
                }

                foreach($expData as $expD){
                    $experienceInfo[] = array(
                        'label' => $desgnD['label'],
                        'percent' => $desgnD['value']
                    );
                }

                if(!empty($designationInfo) && !empty($experienceInfo)){
                    $workExDataArr = array(
                        'title' => 'Work Experience',
                        'description' => !empty($wkDataAppArr['intro']) ? $wkDataAppArr['intro'] : "",
                        'sections' => array(
                            0 => array(
                                "title" => !empty($wkDataAppArr['first_sec_title']) ? $wkDataAppArr['first_sec_title'] : "",
                                "type" => "chart",
                                "content" => $designationInfo
                            ),
                            1 => array(
                                "title" => !empty($wkDataAppArr['second_sec_title']) ? $wkDataAppArr['second_sec_title'] : "",
                                "type" => "chart",
                                "content" => $experienceInfo
                            ),
                        )
                    );
                }
            }

            if(!empty($data[self::SECTION_TYPE_APP_EDUCATIONAL])){
                $eduDataAppArr = $data[self::SECTION_TYPE_APP_EDUCATIONAL];
                $indChartData = !empty($eduDataAppArr['industry_data']) ? $eduDataAppArr['industry_data'] : array();
                $cllgData = !empty($eduDataAppArr['college_logos']) ? $eduDataAppArr['college_logos'] : array();
                $chartInfo = $collage = array();
                
                foreach($indChartData as $indChartD){
                    $chartInfo[] = array(
                        'label' => $indChartD['label'],
                        'percent' => $indChartD['value']
                    );
                }

                foreach($cllgData as $cllgD){
                    $collage[] = array(
                        'image' => $cllgD['value'],
                        'label' => $cllgD['label'],
                        'alt' => $cllgD['label']
                    );
                }

                if(!empty($chartInfo) && !empty($collage)){
                    $educationDataArr = array(
                        'title' => 'Education',
                        'description' => !empty($eduDataAppArr['intro']) ? $eduDataAppArr['intro'] : "",
                        'sections' => array(
                            0 => array(
                                "title" => !empty($eduDataAppArr['first_sec_title']) ? $eduDataAppArr['first_sec_title'] : "",
                                "type" => "chart",
                                "content" => $chartInfo
                            ),
                            1 => array(
                                "title" => !empty($eduDataAppArr['second_sec_title']) ? $eduDataAppArr['second_sec_title'] : "",
                                "type" => "collage",
                                "content" => $collage
                            )
                        )
                    );
                }
            }

            $tabs = array($indDataArr,$workExDataArr,$educationDataArr);
            $tabs = array_filter($tabs);
            $cronFieldMapping['learners_profile']['tabs'] = array_values($tabs);
        }
        
        return $cronFieldMapping;
    }

    public function prepareCronData($data)
    {
        $response = array();
        if (empty($data)) {
            return $response;
        }
        try{
            $productSectionData = $this->prepareResponseData($data,true);
            return $productSectionData;
        } catch (Exception $e) {
            if (APPLICATION_ENV == 'development')
                throw $e;

            return [];
        }
    }
}
