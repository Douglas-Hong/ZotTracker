// This script controls the functionality of the selection section, particularly
// the department, quarter, and instructor select menu


// If any quarter is selected, change the color of the select menu
$("#quarter").on("change", function () {
  $(this).css("color", "black");
});


const depts = ['AC ENG . . . . . .Academic English', 'AFAM . . . . . . . African American Studies', 'ANATOMY . . . .Anatomy and Neurobiology', 'ANESTH . . . . . Anesthesiology', 'ANTHRO . . . . . Anthropology', 'ARABIC . . . . . .Arabic', 'ARMN . . . . . . .Armenian (started 2018 Spg)', 'ART . . . . . . . . .Art', 'ART HIS . . . . . .Art History', 'ARTS . . . . . . . Arts', 'ARTSHUM . . . . Arts and Humanities', 'ASIANAM . . . . Asian American Studies', 'BANA . . . . . . . Business Analytics (started 2017 SS2)', 'BATS . . . . . . . Biomedical and Translational Science', 'BIO SCI . . . . . .Biological Sciences', 'BIOCHEM . . . . Biological Chemistry', 'BME . . . . . . . . Biomedical Engineering', 'BSEMD . . . . . .Bio Sci & Educational Media Design (until 2017 Wtr)', 'CAMPREC . . . .Campus Recreation', 'CBE . . . . . . . . Chemical and Biomolecular Engineering (started 2018 Fall)', 'CBEMS . . . . . .Chemical Engr and Materials Science (until 2019 SS2)', 'CEM . . . . . . . . Community and Environmental Medicine', 'CHC/LAT . . . . . Chicano Latino', 'CHEM . . . . . . .Chemistry', 'CHINESE . . . . .Chinese', 'CLASSIC . . . . .Classics', 'CLT&THY . . . . .Culture & Theory', 'COGS . . . . . . . Cognitive Sciences  (started 2016 Fall)', 'COM LIT . . . . . Comparative Literature', 'COMPSCI . . . . Computer Science', 'CRITISM . . . . . Criticism', 'CRM/LAW . . . . Criminology, Law and Society', 'CSE . . . . . . . . Computer Science and Engineering', 'DANCE . . . . . . Dance', 'DERM . . . . . . .Dermatology', 'DEV BIO . . . . . Developmental and Cell Biology', 'DRAMA . . . . . .Drama', 'E ASIAN . . . . . East Asian Languages and Literatures (until 2019 SS2)', 'EARTHSS . . . . Earth System Science', 'EAS . . . . . . . . East Asian Studies (started 2019 Fall)', 'ECO EVO . . . . Ecology and Evolutionary Biology', 'ECON . . . . . . . Economics', 'ECPS . . . . . . . Embedded and Cyber-Physical Systems', 'ED AFF . . . . . .Educational Affairs (Sch of Med)', 'EDUC . . . . . . . Education', 'EECS . . . . . . . Electrical Engineering & Computer Science', 'EHS . . . . . . . . Environmental Health Sciences', 'ENGLISH . . . . .English', 'ENGR . . . . . . . Engineering', 'ENGRCEE . . . .Engineering, Civil and Environmental', 'ENGRMAE . . . .Engineering, Mechanical and Aerospace', 'ENGRMSE . . . .Materials Science and Engineering (until 2020 SS2)', 'EPIDEM . . . . . .Epidemiology', 'ER MED . . . . . Emergency Medicine', 'EURO ST . . . . .European Studies', 'FAM MED . . . . Family Medicine', 'FIN . . . . . . . . . Finance (started 2017 Fall)', 'FLM&MDA . . . .Film and Media Studies', 'FRENCH . . . . . French', 'GDIM . . . . . . . .Game Design and Interactive Media (started 2021 Fall)', 'GEN&SEX . . . . Gender and Sexuality Studies', 'GERMAN . . . . .German', 'GLBL ME . . . . .Global Middle East Studies (started 2016 Fall)', 'GLBLCLT . . . . .Global Cultures', 'GREEK . . . . . . Greek', 'HEBREW . . . . .Hebrew', 'HINDI . . . . . . . .Hindi', 'HISTORY . . . . .History', 'HUMAN . . . . . .Humanities', 'HUMARTS . . . . Humanities and Arts', 'I&C SCI . . . . . . Information and Computer Science', 'IN4MATX . . . . . Informatics', 'INNO . . . . . . . .Masters of Innovation and Entrepreneurship (started 2019 Fall)', 'INT MED . . . . . Internal Medicine', 'INTL ST . . . . . . International Studies', 'IRAN . . . . . . . .Iranian (started 2020 Fall)', 'ITALIAN . . . . . .Italian', 'JAPANSE . . . . Japanese', 'KOREAN . . . . .Korean', 'LATIN . . . . . . . Latin', 'LAW . . . . . . . . Law', 'LINGUIS . . . . . .Linguistics (until 2019 SS2)', 'LIT JRN . . . . . . Literary Journalism', 'LPS . . . . . . . . .Logic and Philosophy of Science', 'LSCI . . . . . . . . Language Science (started 2019 Fall)', 'M&MG . . . . . . .Microbiology and Molecular Genetics', 'MATH . . . . . . . Mathematics', 'MED . . . . . . . . Medicine', 'MED ED . . . . . Medical Education', 'MED HUM . . . . Medical Humanities (started 2016 Fall)', 'MGMT . . . . . . .Management', 'MGMT EP . . . . Executive MBA', 'MGMT FE . . . . Fully Employed MBA', 'MGMT HC . . . . Health Care MBA', 'MGMTMBA . . . Management MBA', 'MGMTPHD . . . .Management PhD', 'MIC BIO . . . . . .Microbiology', 'MOL BIO . . . . . Molecular Biology and Biochemistry', 'MPAC . . . . . . .Accounting', 'MSE . . . . . . . . Materials Science and Engineering (started 2020 Fall)', 'MUSIC . . . . . . .Music', 'NET SYS . . . . .Networked Systems', 'NEURBIO . . . . .Neurobiology and Behavior', 'NEUROL . . . . . Neurology', 'NUR SCI . . . . . Nursing Science', 'OB/GYN . . . . . Obstetrics and Gynecology', 'OPHTHAL . . . . Ophthalmology', 'PATH . . . . . . . Pathology and Laboratory Medicine', 'PED GEN . . . . Pediatrics Genetics', 'PEDS . . . . . . . Pediatrics', 'PERSIAN . . . . .Persian', 'PHARM . . . . . .Pharmacology (started 2020 Fall)', 'PHILOS . . . . . .Philosophy', 'PHMD . . . . . . .Pharmacy (started 2021 Fall)', 'PHRMSCI . . . . Pharmaceutical Sciences', 'PHY SCI . . . . . Physical Science', 'PHYSICS . . . . .Physics', 'PHYSIO . . . . . .Physiology and Biophysics', 'PLASTIC . . . . . Plastic Surgery', 'PM&R . . . . . . .Physical Medicine and Rehabilitation', 'POL SCI . . . . . Political Science', 'PORTUG . . . . . Portuguese', 'PP&D . . . . . . . Planning, Policy, and Design (until 2018 SS2; see UPPP)', 'PSCI . . . . . . . .Psychological Science (started 2019 Fall)', 'PSY BEH . . . . .Psychology and Social Behavior (until 2019 SS2)', 'PSYCH . . . . . . Psychology', 'PUB POL . . . . .Public Policy', 'PUBHLTH . . . . Public Health', 'RADIO . . . . . . .Radiology', 'REL STD . . . . . Religious Studies', "ROTC . . . . . . . Reserve Officers' Training Corps", 'RUSSIAN . . . . .Russian', 'SOC SCI . . . . . Social Science', 'SOCECOL . . . . Social Ecology', 'SOCIOL . . . . . .Sociology', 'SPANISH . . . . .Spanish', 'SPPS . . . . . . . Social Policy & Public Service', 'STATS . . . . . . .Statistics', 'SURGERY . . . .Surgery', 'SWE . . . . . . . .Software Engineering (started 2019 Fall)', 'TAGALOG . . . . Tagalog', 'TOX . . . . . . . . .Toxicology', 'UCDC . . . . . . . UC Washington DC', 'UNI AFF . . . . . .University Affairs', 'UNI STU . . . . . .University Studies', 'UPPP . . . . . . . Urban Planning and Public Policy (started 2018 Fall)', 'VIETMSE . . . . .Vietnamese', 'VIS STD . . . . . .Visual Studies', 'WRITING . . . . . Writing'];


depts.forEach((dept) => {
  $("#dept").append(`<option value="${dept.slice(0, dept.indexOf(".") - 1)}">${dept}</option>`);
});


const quarters = ['2021  Fall Quarter', '2021  Fall Semester (Law)', '2021  Summer Session 2', '2021  Summer Qtr (COM)', '2021  10-wk Summer', '2021  Summer Session 1', '2021  Spring Quarter', '2021  Winter Quarter', '2020  Fall Quarter', '2020  Summer Session 2', '2020  Summer Qtr (COM)', '2020  10-wk Summer', '2020  Summer Session 1', '2020  Spring Quarter', '2020  Winter Quarter', '2019  Fall Quarter', '2019  Summer Session 2', '2019  Summer Qtr (COM)', '2019  10-wk Summer', '2019  Summer Session 1', '2019  Spring Quarter', '2019  Winter Quarter', '2018  Fall Quarter', '2018  Summer Session 2', '2018  Summer Qtr (COM)', '2018  10-wk Summer', '2018  Summer Session 1', '2018  Spring Quarter', '2018  Winter Quarter', '2017  Fall Quarter', '2017  Summer Session 2', '2017  Summer Qtr (COM)', '2017  10-wk Summer', '2017  Summer Session 1', '2017  Spring Quarter', '2017  Winter Quarter', '2016  Fall Quarter', '2016  Summer Session 2', '2016  Summer Qtr (COM)', '2016  10-wk Summer', '2016  Summer Session 1', '2016  Spring Quarter', '2016  Winter Quarter'];


quarters.forEach((quar) => {
  $("#quarter").append(`<option value="${getQuarterValue(quar)}" style="color: ${getQuarterColor(quar)}">${quar}</option>`);
});


// WebSoc uses special values for each quarter, so this function converts
// the given quarter's name into a value that can be used to query WebSoc
function getQuarterValue(quarter) {
  const year = quarter.slice(0, 4);

  if (quarter.indexOf("Fall") !== -1 && quarter.indexOf("Law") === -1) {
    return `${year}-92`;
  } else if (quarter.indexOf("Fall") !== -1) {
    return `${year}-8F`;
  } else if (quarter.indexOf("Winter") !== -1) {
    return `${year}-03`;
  } else if (quarter.indexOf("Spring") !== -1) {
    return `${year}-14`;
  } else if (quarter.indexOf("Summer Session 1") !== -1) {
    return `${year}-25`;
  } else if (quarter.indexOf("Summer Session 2") !== -1) {
    return `${year}-76`;
  } else if (quarter.indexOf("COM") !== -1) {
    return `${year}-51`;
  } else {
    return `${year}-39`;
  }
}


// This function determines the color of the given quarter in the select menu
function getQuarterColor(quarter) {
  if ((quarter.indexOf("Fall") !== -1 && quarter.indexOf("Law") === -1) || quarter.indexOf("Winter") !== -1 || quarter.indexOf("Spring") !== -1) {
    return "purple";
  } else if (quarter.indexOf("Summer") !== -1 && quarter.indexOf("COM") === -1) {
    return "#744a00";
  } else {
    return "#555";
  }
}


// If the reset button is clicked, we have to make sure that all
// select menus are gray and properly reset
$(".reset-button").on("click", () => {
  $(".selectpicker").val("default");
  $('.selectpicker').selectpicker("refresh");
  $("#quarter").css("color", "gray");
});