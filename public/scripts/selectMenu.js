$("#dept, #quarter").change(function () {
  if ($(this).val() === "") {
    $(this).addClass("select-placeholder");
  } else {
    $(this).removeClass("select-placeholder");
  }
});
$("#dept, #quarter").change();


const depts = ['AC ENG . . . . . .Academic English', 'AFAM . . . . . . . African American Studies', 'ANATOMY . . . .Anatomy and Neurobiology', 'ANESTH . . . . . Anesthesiology', 'ANTHRO . . . . . Anthropology', 'ARABIC . . . . . .Arabic', 'ARMN . . . . . . .Armenian (started 2018 Spg)', 'ART . . . . . . . . .Art', 'ART HIS . . . . . .Art History', 'ARTS . . . . . . . Arts', 'ARTSHUM . . . . Arts and Humanities', 'ASIANAM . . . . Asian American Studies', 'BANA . . . . . . . Business Analytics (started 2017 SS2)', 'BATS . . . . . . . Biomedical and Translational Science', 'BIO SCI . . . . . .Biological Sciences', 'BIOCHEM . . . . Biological Chemistry', 'BME . . . . . . . . Biomedical Engineering', 'BSEMD . . . . . .Bio Sci & Educational Media Design (until 2017 Wtr)', 'CAMPREC . . . .Campus Recreation', 'CBE . . . . . . . . Chemical and Biomolecular Engineering (started 2018 Fall)', 'CBEMS . . . . . .Chemical Engr and Materials Science (until 2019 SS2)', 'CEM . . . . . . . . Community and Environmental Medicine', 'CHC/LAT . . . . . Chicano Latino', 'CHEM . . . . . . .Chemistry', 'CHINESE . . . . .Chinese', 'CLASSIC . . . . .Classics', 'CLT&THY . . . . .Culture & Theory', 'COGS . . . . . . . Cognitive Sciences  (started 2016 Fall)', 'COM LIT . . . . . Comparative Literature', 'COMPSCI . . . . Computer Science', 'CRITISM . . . . . Criticism', 'CRM/LAW . . . . Criminology, Law and Society', 'CSE . . . . . . . . Computer Science and Engineering', 'DANCE . . . . . . Dance', 'DERM . . . . . . .Dermatology', 'DEV BIO . . . . . Developmental and Cell Biology', 'DRAMA . . . . . .Drama', 'E ASIAN . . . . . East Asian Languages and Literatures (until 2019 SS2)', 'EARTHSS . . . . Earth System Science', 'EAS . . . . . . . . East Asian Studies (started 2019 Fall)', 'ECO EVO . . . . Ecology and Evolutionary Biology', 'ECON . . . . . . . Economics', 'ECPS . . . . . . . Embedded and Cyber-Physical Systems', 'ED AFF . . . . . .Educational Affairs (Sch of Med)', 'EDUC . . . . . . . Education', 'EECS . . . . . . . Electrical Engineering & Computer Science', 'EHS . . . . . . . . Environmental Health Sciences', 'ENGLISH . . . . .English', 'ENGR . . . . . . . Engineering', 'ENGRCEE . . . .Engineering, Civil and Environmental', 'ENGRMAE . . . .Engineering, Mechanical and Aerospace', 'ENGRMSE . . . .Materials Science and Engineering (until 2020 SS2)', 'EPIDEM . . . . . .Epidemiology', 'ER MED . . . . . Emergency Medicine', 'EURO ST . . . . .European Studies', 'FAM MED . . . . Family Medicine', 'FIN . . . . . . . . . Finance (started 2017 Fall)', 'FLM&MDA . . . .Film and Media Studies', 'FRENCH . . . . . French', 'GDIM . . . . . . . .Game Design and Interactive Media (started 2021 Fall)', 'GEN&SEX . . . . Gender and Sexuality Studies', 'GERMAN . . . . .German', 'GLBL ME . . . . .Global Middle East Studies (started 2016 Fall)', 'GLBLCLT . . . . .Global Cultures', 'GREEK . . . . . . Greek', 'HEBREW . . . . .Hebrew', 'HINDI . . . . . . . .Hindi', 'HISTORY . . . . .History', 'HUMAN . . . . . .Humanities', 'HUMARTS . . . . Humanities and Arts', 'I&C SCI . . . . . . Information and Computer Science', 'IN4MATX . . . . . Informatics', 'INNO . . . . . . . .Masters of Innovation and Entrepreneurship (started 2019 Fall)', 'INT MED . . . . . Internal Medicine', 'INTL ST . . . . . . International Studies', 'IRAN . . . . . . . .Iranian (started 2020 Fall)', 'ITALIAN . . . . . .Italian', 'JAPANSE . . . . Japanese', 'KOREAN . . . . .Korean', 'LATIN . . . . . . . Latin', 'LAW . . . . . . . . Law', 'LINGUIS . . . . . .Linguistics (until 2019 SS2)', 'LIT JRN . . . . . . Literary Journalism', 'LPS . . . . . . . . .Logic and Philosophy of Science', 'LSCI . . . . . . . . Language Science (started 2019 Fall)', 'M&MG . . . . . . .Microbiology and Molecular Genetics', 'MATH . . . . . . . Mathematics', 'MED . . . . . . . . Medicine', 'MED ED . . . . . Medical Education', 'MED HUM . . . . Medical Humanities (started 2016 Fall)', 'MGMT . . . . . . .Management', 'MGMT EP . . . . Executive MBA', 'MGMT FE . . . . Fully Employed MBA', 'MGMT HC . . . . Health Care MBA', 'MGMTMBA . . . Management MBA', 'MGMTPHD . . . .Management PhD', 'MIC BIO . . . . . .Microbiology', 'MOL BIO . . . . . Molecular Biology and Biochemistry', 'MPAC . . . . . . .Accounting', 'MSE . . . . . . . . Materials Science and Engineering (started 2020 Fall)', 'MUSIC . . . . . . .Music', 'NET SYS . . . . .Networked Systems', 'NEURBIO . . . . .Neurobiology and Behavior', 'NEUROL . . . . . Neurology', 'NUR SCI . . . . . Nursing Science', 'OB/GYN . . . . . Obstetrics and Gynecology', 'OPHTHAL . . . . Ophthalmology', 'PATH . . . . . . . Pathology and Laboratory Medicine', 'PED GEN . . . . Pediatrics Genetics', 'PEDS . . . . . . . Pediatrics', 'PERSIAN . . . . .Persian', 'PHARM . . . . . .Pharmacology (started 2020 Fall)', 'PHILOS . . . . . .Philosophy', 'PHMD . . . . . . .Pharmacy (started 2021 Fall)', 'PHRMSCI . . . . Pharmaceutical Sciences', 'PHY SCI . . . . . Physical Science', 'PHYSICS . . . . .Physics', 'PHYSIO . . . . . .Physiology and Biophysics', 'PLASTIC . . . . . Plastic Surgery', 'PM&R . . . . . . .Physical Medicine and Rehabilitation', 'POL SCI . . . . . Political Science', 'PORTUG . . . . . Portuguese', 'PP&D . . . . . . . Planning, Policy, and Design (until 2018 SS2; see UPPP)', 'PSCI . . . . . . . .Psychological Science (started 2019 Fall)', 'PSY BEH . . . . .Psychology and Social Behavior (until 2019 SS2)', 'PSYCH . . . . . . Psychology', 'PUB POL . . . . .Public Policy', 'PUBHLTH . . . . Public Health', 'RADIO . . . . . . .Radiology', 'REL STD . . . . . Religious Studies', "ROTC . . . . . . . Reserve Officers' Training Corps", 'RUSSIAN . . . . .Russian', 'SOC SCI . . . . . Social Science', 'SOCECOL . . . . Social Ecology', 'SOCIOL . . . . . .Sociology', 'SPANISH . . . . .Spanish', 'SPPS . . . . . . . Social Policy & Public Service', 'STATS . . . . . . .Statistics', 'SURGERY . . . .Surgery', 'SWE . . . . . . . .Software Engineering (started 2019 Fall)', 'TAGALOG . . . . Tagalog', 'TOX . . . . . . . . .Toxicology', 'UCDC . . . . . . . UC Washington DC', 'UNI AFF . . . . . .University Affairs', 'UNI STU . . . . . .University Studies', 'UPPP . . . . . . . Urban Planning and Public Policy (started 2018 Fall)', 'VIETMSE . . . . .Vietnamese', 'VIS STD . . . . . .Visual Studies', 'WRITING . . . . . Writing'];


depts.forEach((dept) => {
  $("#dept").append(`<option value="${dept.slice(0, dept.indexOf(".") - 1)}">${dept}</option>`);
});


const quarters = ['2021  Fall Quarter', '2021  Fall Semester (Law)', '2021  Summer Session 2', '2021  Summer Qtr (COM)', '2021  10-wk Summer', '2021  Summer Session 1', '2021  Spring Quarter', '2021  Winter Quarter', '2020  Fall Quarter', '2020  Summer Session 2', '2020  Summer Qtr (COM)', '2020  10-wk Summer', '2020  Summer Session 1', '2020  Spring Quarter', '2020  Winter Quarter', '2019  Fall Quarter', '2019  Summer Session 2', '2019  Summer Qtr (COM)', '2019  10-wk Summer', '2019  Summer Session 1', '2019  Spring Quarter', '2019  Winter Quarter', '2018  Fall Quarter', '2018  Summer Session 2', '2018  Summer Qtr (COM)', '2018  10-wk Summer', '2018  Summer Session 1', '2018  Spring Quarter', '2018  Winter Quarter', '2017  Fall Quarter', '2017  Summer Session 2', '2017  Summer Qtr (COM)', '2017  10-wk Summer', '2017  Summer Session 1', '2017  Spring Quarter', '2017  Winter Quarter', '2016  Fall Quarter', '2016  Summer Session 2', '2016  Summer Qtr (COM)', '2016  10-wk Summer', '2016  Summer Session 1', '2016  Spring Quarter', '2016  Winter Quarter'];


quarters.forEach((quar) => {
  $("#quarter").append(`<option value="${getQuarterValue(quar)}" style="color: ${getQuarterColor(quar)}">${quar}</option>`);
});


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


function getQuarterColor(quarter) {
  if ((quarter.indexOf("Fall") !== -1 && quarter.indexOf("Law") === -1) || quarter.indexOf("Winter") !== -1
    || quarter.indexOf("Spring") !== -1) {
    return "purple";
  } else if (quarter.indexOf("Summer") !== -1 && quarter.indexOf("COM") === -1) {
    return "#744a00";
  } else {
    return "#555";
  }
}


const instructors = ["ABAZAJIAN, K.", "ABBAS, A.", "ABBOTT, G.", "ABDOLHOSSEINI, M.", "ABDU JYOTHI, S.", "ABRAMOVICH, P.", "ADAMS, T.", "ADELEYE, A.", "ADMIN, M.", "AFABLE, R.", "AFGHANI, B.", "AGAPIE, E.", "AGGARWAL, N.", "AGHAKOUCHAK, A.", "AGHASI, H.", "AGUILAR-ROCA, N.", "AHMAD, A.", "AHMED, I.", "AHN, J.", "AIZIK, S.", "AKAGI, K.", "AL FARUQUE, M.", "AL-BULUSHI, S.", "AL-BULUSHI, Y.", "ALACHKAR, A.", "ALAO, N.", "ALCARAZ, L.", "ALEXANDER, J.", "ALFARO, S.", "ALGABRE, J.", "ALLAIRE, M.", "ALLARD, J.", "ALLEN, E.", "ALLISON, S.", "AMAR SANCHEZ, A.", "AMENTA, E.", "AMIRAN, E.", "AMIRI SANI, A.", "AMIRKHIZI, M.", "ANASTAS, R.", "ANDERSEN, B.", "ANDERSON, A.", "ANDERSON, L.", "ANDRADE, R.", "ANDREASEN, M.", "ANDREWS, B.", "ANDREWS, S.", "ANDRICIOAEI, I.", "ANEMA, A.", "ANGELES, B.", "ANTON-CULVER, H.", "AOUAD, M.", "APELIAN, D.", "APKARIAN, A.", "APPEL, K.", "ARASASINGHAM, R.", "ARDO, S.", "ARDONA, H.", "ARGUILLA, M.", "ARIMOND, J.", "ARMSTRONG, D.", "ARTHI, V.", "ARUM, R.", "ASWAD, D.", "ATANASSOV, P.", "ATHANASIOU, K.", "ATWOOD, S.", "AU, S.", "AUNGIER, K.", "AVILES, L.", "AVISE, J.", "AWAD, S.", "AYANOGLU, E.", "AZIZI, E.", "BA, B.", "BACH, S.", "BADER HUESGEN, M.", "BAGHERZADEH, N.", "BAGHGAR BOSTAN, R.", "BAILEY, D.", "BAILEY, S.", "BAKER, D.", "BAKER, R.", "BALDI, B.", "BALDI, P.", "BALDWIN, J.", "BALDWIN, M.", "BALLAKRISHNEN, S.", "BANDELJ, N.", "BANERJEE, T.", "BARAM, T.Z.", "BARANOVSKY, V.", "BARBOUR, A.", "BARDWELL, L.", "BARKER, S.", "BARRETT, J.", "BARRON, C.", "BARRY, R.", "BARTELL, S.", "BARTH, A.", "BARTY, C.", "BARWICK, S.", "BASOLO, M.", "BASSHAM, C.", "BAUER, A.", "BAUM, E.", "BAUMAN, C.", "BEAN, F.", "BEAUCHAMP, T.", "BECKMANN, M.", "BEIER, K.", "BELL, K.", "BENAMOU, C.", "BENAVENTE, C.", "BENCA, R.", "BENDER, M.", "BENMOHAMED, L.", "BENNETT, A.", "BENNETT, F.", "BENNETT, J.", "BERBERIAN, H.", "BERG, B.", "BERK, H.", "BERNAL, V.", "BERNARD, H.", "BERNECKER, S.", "BERROCAL, V.", "BESS, E.", "BETANCOURT, R.", "BHATT, I.", "BIAN, J.", "BIC, L.", "BIC, Z.", "BIENDARRA, A.", "BIETZ, M.", "BILAKOVICS, S.", "BILLIMEK, J.", "BLACK, R.", "BLAKE, D.", "BLOCK, S.", "BLUM, S.", "BLUMBERG, B.", "BLURTON-JONES, M.", "BOCIAN, M.", "BODEN-ALBALA, B.", "BOELLSTORFF, T.", "BOGART, D.", "BOHLSON, S.", "BOIKO, A.", "BOLLENS, S.", "BONCOMPAGNI, A.", "BONDY, S.", "BORBA, A.", "BORELLI, J.", "BORNSTEIN, A.", "BORNSTEIN, J.", "BOROVIK, A.", "BORRELLI, E.", "BORUCKI, A.", "BOTVINICK, E.", "BOUCHEREAU, T.", "BOUNDS, D.", "BOUSHEY, G.", "BOWKER, G.", "BOWLER, P.", "BOWMAN, B.", "BOWMAN, W.", "BOYRAZ, O.", "BOZORGZADEH, E.", "BRACKEN, M.", "BRADFORD, K.", "BRADFORD, T.", "BRADSHAW, R.", "BRANCH, W.", "BRANDO, P.", "BRANHAM, S.", "BRAUER ROGERS, E.", "BREDOW, V.", "BRESTOFF, R.", "BREWER, A.", "BREWER, G.", "BRISCOE, A.", "BRODBECK, D.", "BRODY, J.", "BROMILEY, P.", "BROUILLETTE, L.", "BROUSSARD, A.", "BROUWER, J.", "BROWN, S.", "BROWNE, A.", "BRUCKNER, T.", "BRUECKNER, J.", "BRUNSTETTER, D.", "BUCHMEIER, M.", "BUCK, R.", "BUENO, M.", "BUI, L.", "BUISSON, R.", "BULLOCK, J.", "BUOTE, D.", "BURKE, K.", "BURKE, L.", "BURKE, P.", "BURLEY, N.", "BURNS, M.", "BURTON, C.", "BURTSEV, A.", "BUSCIGLIO, J.", "BUSTAMANTE, A.", "BUSWELL, N.", "BUTTERI, M.", "BUTTS, C.", "CABATINGAN, L.", "CAHALAN, M.", "CAHILL, L.", "CALDERON LEON, M.", "CALOF, A.", "CAMACHO, J.", "CAMERINI, D.", "CAMPBELL, D.", "CAMPBELL, S.", "CAMPO, M.", "CAMPOS, B.", "CANE, E.", "CANEPA, M.", "CAO, H.", "CAO, J.", "CAO, P.", "CAPOLINO, F.", "CAPUTO, D.", "CAREY, M.", "CARLO, G.", "CARLO, R.", "CARLTON, A.", "CARRILLO, J.", "CARSON, J.", "CARTER, P.", "CARTIER, M.", "CARVALHO, J.", "CASALI, P.", "CASAVANTES BRA, A.", "CASPER, D.", "CASTELLANOS, J.", "CASTILLO, L.", "CATZ, S.", "CAUFFMAN, E.", "CECH, J.", "CERRAHOGLU, V.", "CHAHINIAN, T.", "CHAKRAVARTHY, B.", "CHAMBERLIN, A.", "CHAMBERS, S.", "CHAN, A.", "CHANDLER, M.", "CHANDLER, N.", "CHANDRAMOWLISH, A.", "CHANDY, K.", "CHANG, R.", "CHAO, E.", "CHAO, M.", "CHAPUT, J.", "CHARLES, S.", "CHATURVEDI, V.", "CHAUDHRY, M.", "CHAVEZ, C.", "CHAVEZ, E.", "CHAVEZ, L.", "CHEN, C.", "CHEN, J.", "CHEN, L.", "CHEN, M.", "CHEN, P.", "CHEN, Q.", "CHEN, Y.", "CHEN, Z.", "CHENG, T.", "CHERNYAK, N.", "CHERNYSHEV, A.", "CHERNYSHOFF, N.", "CHESLER, N.", "CHIAMPI, J.", "CHIENG, C.", "CHO, J.", "CHOATE HUFFT, E.", "CHOI, B.", "CHOI, Y.", "CHOU, P.", "CHOUDHARY, V.", "CHOW, E.", "CHRASTIL, E.", "CHUBB, C.", "CHUK, E.", "CIMENSKI, J.", "CINQUIN, O.", "CIVELLI, O.", "CLARK, D.", "CLARK, H.", "CLONTZ, A.", "CLOUD, P.", "COCCO, M.", "COHEN, L.", "COHEN-CORY, S.", "COLCLOUGH, T.", "COLE, S.", "COLIVA, A.", "COLLER, I.", "COLLINS, P.", "COLLINS, R.", "CONCHAS, G.", "CONNOR, K.", "COOKS, B.", "COOLIDGE, M.", "COOPER, M.", "COORAY, A.", "COPP, D.", "COPP, S.", "COREY, M.", "CORN, R.", "CORRADA-BRAVO, M.", "CORTEZ, E.", "CORWIN, M.", "COTMAN, C.", "COULSON, N.", "COUTIN, S.", "COX, A.", "CRAMER, K.", "CRANSTON, M.", "CRAWFORD, J.", "CROOK, E.", "CROOKS, R.", "CULVER, D.", "CUMMINGS, B.", "CUMSKY, M.", "CUNNINGHAM, L.", "CURRIE, E.", "CURRIM, I.", "CZIMCZIK, C.", "Computer Sc", "D'ZMURA, T.", "DA SILVA, N.", "DABDUB, D.", "DAI, X.", "DALEY, M.", "DALTON, T.", "DANG, Q.", "DANIEL, K.", "DANNER, K.", "DANZIGER, J.", "DARIAN-SMITH, E.", "DARYAEE, T.", "DAUCHAN, D.", "DAULATZAI, S.", "DAVIS, C.", "DAVIS, J.", "DAVIS, K.", "DAVIS, R.", "DAVIS, S.", "DAVOUDI, M.", "DE FLAVIIS, F.", "DE LA MAZA, H.", "DE PETRIS, A.", "DE SOUZA SANTO, V.", "DECHTER, R.", "DELANEY, M.", "DELANY-ULLMAN, L.", "DELFINO, R.", "DELGADILLO, E.", "DELLACA, R.", "DEMETRIOU, M.", "DEMSKY, B.", "DENENBERG, D.", "DENNIN, M.", "DENT, A.", "DEPAUL, A.", "DEPPE, M.", "DESIPIO, L.", "DESSEN, M.", "DETRANO, R.", "DETWILER, R.", "DEWAN, S.", "DEWAN, W.", "DI MAIO, F.", "DIAMOND, C.", "DIAZ ALONSO, J.", "DIAZ ALONZO, J.", "DIAZ, J.", "DIEFENDERFER, D.", "DIETZ, Z.", "DIGMAN, M.", "DILLENCOURT, M.", "DILLON, S.", "DIMAS, D.", "DIMENDBERG, E.", "DING, F.", "DITTO, P.", "DJALILIAN, H.", "DO, A.", "DOBRIAN, J.", "DOEDENS, R.", "DOEMER, R.", "DOGUCU, M.", "DOH, J.", "DOLAN, B.", "DOLLAR, F.", "DONALDSON, B.", "DONALDSON, N.", "DONG, V.", "DONG, Y.", "DONOVAN, P.", "DOROUDI, S.", "DOSHER, B.", "DOUGLAS, T.", "DOURISH, J.", "DOW, E.", "DOWELL, N.", "DOWNING, T.", "DROVER, C.", "DRUFFEL, E.", "DUBEY, J.", "DUFFY, J.", "DUKE, N.", "DUNCAN, G.", "DUNCAN, R.", "DUNN-RANKIN, D.", "DUONG, D.", "DURBIN, H.", "DURKIN, A.", "DURON, A.", "DUTT, N.", "EARTHMAN, J.", "EASON, K.", "EASON, L.", "ECCLES, J.", "EDINGER, A.", "EDWARDS, K.", "EDWARDS, KD.", "EDWARDS, R.", "EGAN, J.", "EGOH, B.", "EL ZARKI, M.", "ELFENBEIN, D.", "ELGHOBASHI, S.", "ELLIS, T.", "ELMALAKI, S.", "ELTAWIL, A.", "EMERSON, J.", "ENCISO RUIZ, G.", "ENG, W.", "ENRIQUEZ, L.", "EPPEL, T.", "EPPSTEIN, D.", "EPSTEIN, D.", "ESFANDYARPOUR, R.", "ESPINOZA, C.", "EVANS, G.", "EVANS, W.", "EVERS, K.", "FAIOLA, C.", "FAN, C.", "FAN, H.", "FARBMAN, H.", "FARKAS, G.", "FARMER, S.", "FAUST, K.", "FAY, L.", "FEDEROFF, H.", "FEDMAN, D.", "FELDMAN, D.", "FELDMAN, M.", "FELGNER, P.", "FENG, J.", "FERBER, A.", "FERGUSON, J.", "FERMIN, J.", "FIGOTIN, A.", "FINKELDEI, S.", "FINLAYSON-PITT, B.", "FINLEY, K.", "FIOCCO, M.", "FISCHER, A.", "FISHER, J.", "FISHER, M.", "FISHMAN, D.", "FLAIZ-WINDHAM, J.", "FLANAGAN, L.", "FLANAGAN-MONUK, L.", "FLEISCHER, E.", "FLEISCHMAN, A.", "FLODMAN, P.", "FLOREA, A.", "FLORES, G.", "FLORES, Y.", "FOREMAN, M.", "FORESTA, J.", "FORTIER, M.", "FORTIN, N.", "FORTUN, K.", "FORTUN, M.", "FOUFOULA, E.", "FOWLER, C.", "FOWLKES, C.", "FOX, J.", "FOX, R.", "FRANCO, S.", "FRANCOLINO, J.", "FRANK, D.", "FRANK, S.", "FRANKE, N.", "FRANZ, M.", "FREEDMAN, M.", "FREEMAN, F.", "FREITES, J.", "FRENCH, K.", "FROEHLICH, M.", "FROSTIG, R.", "FRUEHAUF, J.", "FRUMAN, D.", "FU, X.", "FUJITA-RONY, D.", "FUNG, K.", "FURCHE, F.", "FUTRELL, R.", "GABBERT, M.", "GAGO MASAGUE, S.", "GALL, C.", "GALLE, R.", "GAMERO CASTANO, M.", "GANDHI, S.", "GANESAN, A.", "GARCIA, J.", "GARDE, A.", "GARFIN, D.", "GARFINKEL, M.", "GARGUS, J.", "GARIBAY, A.", "GARRETT, T.", "GARRISON, J.", "GASSKO, I.", "GATLIN NASH, B.", "GAUDIOT, J.", "GAUT, B.", "GAYLE, H.", "GE, N.", "GEHRICKE, J.", "GEIMAN, T.", "GELLER, A.", "GEORGIOU, T.", "GERACI, J.", "GERBER, R.", "GERMAN, D.", "GERSHON, P.", "GHONIEM, G.", "GIAKOUMIS, S.", "GIANNOPOULOU, Z.", "GIBBS, L.", "GIBBS, T.", "GIDEONSE, T.", "GILBERT, M.", "GILLEN, D.", "GILLESPIE, J.", "GILLY GRAHAM, M.", "GILMORE, S.", "GILMOUR, L.", "GIVARGIS, T.", "GLABE, C.", "GLAZER, A.", "GLICKER, H.", "GLYNN, L.", "GOLDBERG, D.", "GOLDBERG, R.", "GOLDBRING, I.", "GOLDIN, A.", "GOLDSTEIN, S.", "GOLOB, B.", "GOMIS, J.", "GONEN, S.", "GONZALEZ, J.", "GONZALEZ, R.", "GOODMAN, S.", "GOODRICH, M.", "GOODRIDGE, S.", "GORODETSKI, A.", "GORODETSKY, A.", "GOTTFREDSON, M.", "GOULDEN, M.", "GOULDING, C.", "GRADY, K.", "GRANDO, S.", "GRANGER, D.", "GRANT LUDWIG, L.", "GRANT, S.", "GRATTON, E.", "GREEN, K.", "GREEN, M.", "GREENBERG, M.", "GREENBERG, S.", "GREENE, F.", "GREENFIELD, S.", "GRIFFEY, T.", "GRIFFIN, C.", "GRIFFITT BEDEL, L.", "GRILL, J.", "GRIMES, N.", "GROFMAN, B.", "GROSBERG, A.", "GROSS, D.", "GROSS, E.", "GROSS, S.", "GROSSMAN, E.", "GUAN, Z.", "GUARINO, J.", "GUENTHER, A.", "GUERRA, A.", "GUERRA, N.", "GUI, L.", "GUIDOTTI, P.", "GUILFOYLE, S.", "GUINDANI, M.", "GULESSERIAN, S.", "GULLABA, A.", "GULSEN, G.", "GUO, Q.", "GUO, R.", "GUO, Y.", "GUPTA, K.", "GUPTA, R.", "GURBAXANI, V.", "GUTIERREZ, A.", "GUZOWSKI, J.", "HAAS, L.", "HAGEDORN, J.", "HAGGINS, B.", "HAIGLER, H.", "HALBROOK, C.", "HALL, C.", "HALL, J.", "HALL, K.", "HAMBER, H.", "HAMDY, S.", "HAMMEL, S.", "HAN, S.", "HANESSIAN, S.", "HANSELMAN, P.", "HANSEN, J.", "HANSON-KEGERRE, S.", "HARDEN, S.", "HARDING, C.", "HARDING, M.", "HARDT, H.", "HARE, M.", "HARNELL, J.", "HARNICK-SHAPIR, B.", "HARPER, E.", "HARRIES, M.", "HARRIS, I.", "HART, G.", "HARVEY, R.", "HARVEY, S.", "HASSELMANN, J.", "HATCH, K.", "HAUN, J.", "HAYASAKI, E.", "HAYES, G.", "HAYES, W.", "HAYNES, D.", "HEAD, E.", "HEALEY, G.", "HEATONSMITH, G.", "HECKHAUSEN, J.", "HEIDBRINK, W.", "HEINE, B.", "HEIS, J.", "HELMREICH, J.", "HELMY, M.", "HEMMINGER, J.", "HENDERSON, M.", "HENRY, A.", "HENRY, V.", "HERBERT, J.", "HERNANDEZ, A.", "HERNANDEZ, M.", "HERNANDEZ, W.", "HERNANDEZ-TORR, I.", "HERNSBERGER, J.", "HERTEL, K.", "HEYDARI, P.", "HEYDUK, A.", "HEZARI, H.", "HICKOK, G.", "HICKS, J.", "HICKS, M.", "HIGHSMITH, A.", "HILDERBRAND, L.", "HILL, D.", "HIPP, J.", "HIRONAKA, A.", "HIRSCHBERG, D.", "HIRSHLEIFER, D.", "HITE, J.", "HO, D.", "HO, W.", "HOCHBAUM, A.", "HOLMAN, E.", "HOLMES, D.", "HOLMES, T.", "HOLTON, A.", "HONG, P.", "HOO, C.", "HOOKER, M.", "HOONPONGSIMANO, W.", "HOOPER, A.", "HOPFER, S.", "HOPSTER, H.", "HOSHI, N.", "HOUSTON, J.", "HOUSTON, K.", "HOWELL, T.", "HOYT, M.", "HRUBY, J.", "HSU, K.", "HU, Y.", "HUANG, C.", "HUANG, L.", "HUANG, M.", "HUANG, T.", "HUBER, K.", "HUFFMAN, M.", "HUGHES, B.", "HUGHES, C.", "HUI, E.", "HUIE, K.", "HUNDLE, A.", "HUNT, R.", "HURLEY, K.", "HUTTEGGER, S.", "HUXMAN, T.", "HYATT, J.", "HYDE, K.", "HYLAND, M.", "IBRAHIM, M.", "IGARASHI, K.", "IGLER, D.", "IHLER, A.", "ILOH, C.", "IMADA, A.", "IMANI, M.", "INLAY, M.", "IQBAL, S.", "IRANI, S.", "ITO, M.", "ITURRIAGA, N.", "IVY, A.", "IZENBERG, O.", "JABBARI, F.", "JACKSON, J.B.", "JACKSON, J.C.", "JACKSON, V.", "JAEGGI, S.", "JAFAR, S.", "JAFARI, M.", "JAFARKHANI, H.", "JAIN, R.", "JALILI, M.", "JAMES, A.", "JAMES, W.", "JAMNER, L.", "JANDA, K.", "JANG, C.", "JARECKI, S.", "JARRATT, S.", "JARVO, E.", "JAUREGUI PARED, L.", "JAYAKRISHNAN, R.", "JEFFERS, R.", "JELIAZKOV, I.", "JENKINS, B.", "JENKINS, J.", "JENKINS, U.", "JENKS, A.", "JENNESS, V.", "JEON, J.", "JESTER, J.", "JHA, P.", "JIANG, C.", "JIANG, L.", "JIN, R.", "JIN, W.", "JITOMIRSKAYA, S.", "JOHNSON, A.", "JOHNSON, K.", "JOHNSON, V.", "JOHNSON, W.", "JOHNSTON, J.", "JONES, J.", "JONES, N.", "JORDAN, S.", "JORION, P.", "JORJANI SADRI, S.", "JOSEPH, J.", "JUERGENS, M.", "JUHASZ, T.", "JUN, A.", "JUN, S.", "JURNAK, F.", "KADANDALE, P.", "KAISER, P.", "KALANTAR-ZADEH, K.", "KAMIL, M.", "KAMINSKI, M.", "KANG, H.", "KANG, L.", "KAPLAN, N.", "KAPLAN, S.", "KAPLINGHAT, M.", "KARANIKA, A.", "KASK, K.", "KASSAS, Z.", "KATRAK, K.", "KAVIANPOUR, A.", "KAWAS, C.", "KEELER, C.", "KEEPERMAN, J.", "KEEPERMAN, T.", "KELLER, L.", "KELLER, S.", "KELLEY, P.", "KELLY, R.", "KESSENBROCK, K.", "KEYAK, J.", "KHAN, A.", "KHARGONEKAR, P.", "KHERADVAR, A.", "KHERIATY, A.", "KHINE, M.", "KIA, S.", "KIAN, S.", "KIKLOWICZ, D.", "KIM, C.", "KIM, E.", "KIM, H.", "KIM, J.", "KIM, K.", "KIM, S.", "KIM, Y.", "KIMBALL, S.", "KIMONIS, V.", "KIMURA, M.", "KING, C.", "KING, L.", "KING, S.", "KIRKBY, A.", "KIRKBY, D.", "KISAILUS, D.", "KISER, P.", "KITAZAWA, M.", "KLEFSTAD, R.", "KLEIN, A.", "KLEIN, L.", "KLEINFELDER, S.", "KLEINMAN, M.", "KLEMFUSS, J.", "KNIAZEVA, M.", "KNIGHT, D.", "KOMAROVA, N.", "KONG, M.", "KONGSHAUG, E.", "KOO, S.", "KOPPMAN, S.", "KOPSTEIN, J.", "KOPYLOV, I.", "KOSMALA, J.", "KOYUNCU, O.", "KRAPP, P.", "KRICHMAR, J.", "KRIVOROTOV, I.", "KROLL, J.", "KRONE MARTINS, A.", "KRONEWETTER, J.", "KRUGGEL, F.", "KRUPCHYK, K.", "KRUSE, D.", "KUBIAK, A.", "KUBRIN, C.", "KUHLMAN, K.", "KULINSKY, L.", "KUMAR, M.", "KUNIGAMI, A.", "KURDAHI, F.", "KWON, Y.", "KWUN, N.", "LAFARGE, A.", "LAFERLA, F.", "LAKEY, J.", "LAKON, C.", "LAMB, J.", "LANDER, A.", "LANE, F.", "LANE, L.", "LANE, N.", "LANE, T.", "LANKFORD, A.", "LANNING, J.", "LANYI, J.", "LARUE, J.", "LATIOLAIS, P.", "LAU, E.", "LAU, L.", "LAU, W.", "LAVERNIA, E.", "LAW, M.", "LAWSON, D.", "LE VINE, M.", "LE-BUCKLIN, K.", "LEBRON, A.", "LEE, A.", "LEE, C.", "LEE, G.", "LEE, H.", "LEE, J.", "LEE, J.W.", "LEE, M.", "LEE, S.", "LEE, T.", "LEE, Y.", "LEGRAS, H.", "LEHMAN, R.", "LEHMANN, M.", "LEI, D.", "LEKAWA, M.", "LEMNITZER, A.", "LEON, J.", "LEON, M.", "LERCH, J.", "LERNER, S.", "LESLIE, F.", "LETOURNEAU, D.", "LEUNG, M.", "LEUNG, S.", "LEVIN FIORELLI, I.", "LEVIN, E.", "LEVINE, G.", "LEVINE, L.", "LEVINE, R.", "LEVITT, L.", "LEVORATO, M.", "LEW, A.", "LEWIN, K.", "LEWIS, J.", "LI, C.", "LI, G.", "LI, H.", "LI, M.", "LI, S.", "LI, W.", "LI, Z.", "LIANG, C.", "LIAO, S.", "LIEBECK, R.", "LIEBERSOHN, C.", "LIGETI, L.", "LILJEHOLM, M.", "LILLMARS, B.", "LIM, B.", "LIMOLI, C.", "LIN, J.", "LIN, K.", "LIN, Z.", "LINDSAY, E.", "LINK, R.", "LITWIN, C.", "LIU, C.", "LIU, F.", "LIU, H.", "LIU, W.", "LIU-SMITH, F.", "LIVINGSTON, L.", "LOCK, L.", "LOCKWOOD, E.", "LODOEN, M.", "LOFGREN, C.", "LOFTUS, E.", "LONG, A.", "LONG, J.", "LONG, M.", "LONGMUIR, K.", "LOPES, C.", "LOPOUR, B.", "LOTFIPOUR, S.", "LOTT, I.", "LOUDON, C.", "LOUI, A.", "LOURIE, B.", "LOVE, T.", "LOWENGRUB, J.", "LU, Y.", "LU, Z.", "LUBOVITCH, L.", "LUDERER, U.", "LUDWIG, J.", "LUECKE, H.", "LUI, J.", "LUKOWSKI, A.", "LUNAWAT, R.", "LUO, R.", "LUPTAK, A.", "LUPTON, J.", "LUR, G.", "LUTTERSCHMIDT, D.", "LYNCH, C.", "LYNCH, G.", "LYNCH, M.", "LYON, D.", "MA, A.", "MACCRORY, F.", "MACKEY, K.", "MADDY, P.", "MADOU, M.", "MAGGIA, M.", "MAGNUSDOTTIR, G.", "MAHIEUX, V.", "MAHLER, S.", "MAHLKE, S.", "MAHMUD, L.", "MAITLAND, J.", "MAJOLI, M.", "MAJUMDER, A.", "MALABOU, C.", "MALCZEWSKI, J.", "MALEK, S.", "MALPASS, M.", "MANCHAK, J.", "MANDELSHTAM, V.", "MANDT, S.", "MANG, S.", "MANIAR, R.", "MANN, D.", "MANTOS, M.", "MARADUDIN, A.", "MARANGONI, F.", "MARANTZ, N.", "MARCUS, G.", "MARI, R.", "MARK, G.", "MARKOPOULOU, A.", "MARSDEN, M.", "MARTENS, C.", "MARTIN, E.", "MARTIN, R.", "MARTIN, T.", "MARTINEZ, C.", "MARTINEZ, D.", "MARTINO, N.", "MARTINY, A.", "MARTINY, J.", "MARZOLA, L.", "MASRI, S.", "MASSEY, L.", "MATTHEW, R.", "MAUNEY, J.", "MAURER, W.", "MAUZY-MELITZ, D.", "MAZMANIAN, M.", "MAZUMDAR, S.", "MAZZACANE, D.", "MC CLEARY, R.", "MCBRIDE, M.", "MCCARTHY, J.", "MCCARTY, P.", "MCCLANAHAN, A.", "MCCLELLAND, M.", "MCCLURE, G.", "MCDONELL, V.", "MCDOUGALL, E.", "MCEVOY, A.", "MCEWAN, S.", "MCGUIRE, C.", "MCHENRY, M.", "MCKAY, L.", "MCKENNA, J.", "MCKEOWN, K.", "MCLAREN, C.", "MCLOUGHLIN, N.", "MCNALLY, M.", "MCNAUGHTON, B.", "MCNULTY, R.", "MCPHERSON, A.", "MCTHOMAS, M.", "MCWILLIAMS, R.", "MEADOWS, T.", "MEASE, K.", "MECARTNEY, M.", "MEDNICK, S.", "MEENAKSHISUNDA, G.", "MEHROTRA, S.", "MENDEZ, M.", "MESSAOUDI POWE, I.", "MESSOLORAS, I.", "METHERATE, R.", "MEYER, D.", "MEYSKENS, F.", "MIDDLEBROOKS, J.", "MIHAIL, K.", "MIJALSKI, M.", "MILAM, J.", "MILANI, F.", "MILLER, G.", "MILLER, R.", "MILLER, T.", "MILLS, S.", "MILLWARD, J.", "MILNER, T.", "MIMURA, G.", "MININ, V.", "MININA, Y.", "MIS, B.", "MITCHELL, L.", "MJOLSNESS, E.", "MJOLSNESS, L.", "MOAYEDI, N.", "MOBLEY, D.", "MOHRAZ, A.", "MOLINA, K.", "MOLLOI, S.", "MOLZON, W.", "MONROE, K.", "MONTANEZ, M.", "MONTERO ROMAN, V.", "MOONEY, C.", "MOONEY, K.", "MOORE, J.", "MOR, L.", "MORA QUILON, M.", "MORALES, A.", "MORALES-RIVERA, S.", "MOREAU, E.", "MOREY, B.", "MORGAN, C.", "MORGAN, P.", "MORLIGHEM, M.", "MOROHASHI, D.", "MORRISSETTE, N.", "MORRISSEY, S.", "MORTAZAVI, S.", "MOSALLAM, A.", "MOTA-BRAVO, L.", "MOULIK, S.", "MOURAD, G.", "MOZAFFAR, T.", "MRAZEK, J.", "MUDIWA, R.", "MUELLER, L.", "MUKAMEL, D.", "MUKAMEL, S.", "MULLIGAN, R.", "MUMM, D.", "MUNIZ, A.", "MUNRO, I.", "MURATA, P.", "MURGIA, S.", "MURILLO, J.", "MURPHY, K.", "MURRAY, C.", "MURRAY, S.", "NAEIM, F.", "NAJM, W.", "NALCIOGLU, O.", "NAM, S.", "NAN, B.", "NARENS, L.", "NASIR, S.", "NATHAN, D.", "NATION, D.", "NAUGLE, L.", "NAVA, A.", "NAVAJAS, G.", "NAVARRO, E.", "NAVI, K.", "NAWAB, F.", "NEFTCI, E.", "NEIGHBORS, T.", "NEIKRUG, A.", "NELSON, E.", "NELSON, J.", "NENADIC, Z.", "NEUHAUSEN, S.", "NEUMARK, D.", "NEWMAN, J.", "NGUYEN, D.", "NGUYEN, L.", "NGUYEN, P.", "NIAN, T.", "NICHOL, J.", "NICHOLAS, A.", "NICHOLLS, W.", "NICOLAU, A.", "NIE, Q.", "NIELSEN, R.", "NIELSEN, T.", "NIEMAN, J.", "NILSSON, M.", "NISBET, J.", "NIZKORODOV, S.", "NOLAND, C.", "NORDEN-KRICHMA, T.", "NOVACO, R.", "NOWICK, J.", "NOYMER, A.", "NYAMATHI, A.", "O'CONNOR, C.", "O'CONNOR, L.", "O'DOWD, D.", "O'ROURKE, S.", "O'TOOLE, R.", "OAKLEY, M.", "OBENAUS, A.", "OCHI, D.", "OCHOA RICOUX, J.", "ODEGAARD, A.", "ODGERS, C.", "OGUNFOLU, A.", "OGUNSEITAN, O.", "OKHUYSEN, G.", "OLABISI, R.", "OLESZKIEWICZ, D.", "OLIVARES MARTI, C.", "OLIVEIRA, G.", "OLIVER, D.", "OLIVIERI, V.", "OLSON, C.", "OLSON, K.", "OLSON, V.", "OMOUMI, H.", "ONG, S.", "ORTEGA-SECHRES, J.", "OSBORN, M.", "OSTLUND, S.", "OVERMAN, L.", "OWENS, E.", "PADAK, B.", "PADERNACHT, S.", "PAEGEL, B.", "PAGE, J.", "PALCZEWSKI, K.", "PALERMO, A.", "PALMER, N.", "PAN, D.", "PAN, X.", "PANAGEAS, I.", "PANNUNZIO, N.", "PANTANO, A.", "PANTELIA, M.", "PAPAEFTHYMIOU, M.", "PAPAMOSCHOU, D.", "PARAMESWARAN, S.", "PARK, H.", "PARK, J.", "PARKER, D.", "PARKER, I.", "PARKER, W.", "PARKS, S.", "PARKS, V.", "PARRIS, T.", "PARSONS, M.", "PASSY, V.", "PASTOR, J.", "PATEL, A.", "PATEL, U.", "PATHAK, M.", "PATTERSON, J.", "PATTIS, R.", "PEARCE, J.", "PEARL, L.", "PEARLMAN, E.", "PECHMANN, C.", "PEDERSEN, I.", "PELAYO, R.", "PENA, E.", "PENNER, A.", "PENNER, E.", "PENNER, R.", "PENNY, S.", "PEPPLER, K.", "PERAZA HERNAND, E.", "PERIN, C.", "PERKINS, B.", "PERLMAN, A.", "PETERS, M.", "PETERSON, K.", "PETROVIC, B.", "PHALEN, R.", "PHELAN, M.", "PHILIP, K.", "PHILLIPS, S.", "PHOENIX, D.", "PICHLER, S.", "PIERSON, P.", "PIFF, P.", "PILAFIDIS, E.", "PINCUS, M.", "PINTER, G.", "PINTO, M.", "PIOMELLI, D.", "PIPER, A.", "PIPKIN, S.", "PITT, J.", "PIZLO, Z.", "PLIKUS, M.", "POIRIER, L.", "POLLETTA, F.", "PONTELL, H.", "POTMA, E.", "POULOS, T.", "POURMOHAMMADI, H.", "POWER, T.", "PRATHER, M.", "PRATT, J.", "PREECE, D.", "PRESCHER, J.", "PRESSMAN, S.", "PRICE, D.", "PRICE, Z.", "PRIMEAU, F.", "PRITCHARD, D.", "PRITCHARD, M.", "PRONIN, S.", "Psychiatry", "QIAN, T.", "QIAO, F.", "QU, A.", "QUAS, J.", "QUINTANA NAVAR, M.", "QUINTANA, I.", "RADHAKRISHNAN, R.", "RAFELSKI, S.", "RAFFEL, L.", "RAFI, M.", "RAFIQUE, K.", "RAGAN, R.", "RAGIN, C.", "RAHIMIEH, N.", "RAHMANI, A.", "RAJARAMAN, A.", "RAMACHANDRAN, V.", "RAMOS, I.", "RANDERSON, J.", "RANDRUP, N.", "RANGEL, R.", "RANZ, J.", "RAPHAEL, R.", "RATZ, M.", "RAZO, A.", "RAZORENOVA, O.", "REA, J.", "READ, E.", "REARDON, C.", "REBOLLEDA-GOME, M.", "RECKER, W.", "REDMILES, D.", "REED, C.", "REGAN, A.", "REICH, S.", "REINKENSMEYER, D.", "REINSCHEID, R.", "REITER, K.", "RENDON, M.", "RESENDEZ, J.", "REYES, A.", "REYES, M.", "REYNOLDS, B.", "RHEE, S.", "RHODES, K.", "RIBBE, M.", "RICHARDS, V.", "RICHARDSON, B.", "RICHARDSON, G.", "RICHEY, T.", "RICHLAND, J.", "RICHLAND, L.", "RIGNOT, E.", "RIIS PETROU, J.", "RIIS, J.", "RILEY, T.", "RINEHART, J.", "RITCHIE, K.", "RITCHIE, S.", "RITZ, T.", "RIVAS, S.", "RIVERA, D.", "RO, A.", "ROBBINS, T.", "ROBERTS, W.", "ROBERTSON, P.", "ROBERTSON, R.", "ROCHA, M.", "ROCHE, M.", "ROCHETEAU, G.", "RODMAN, T.", "RODRIGUEZ LOPE, J.", "RODRIGUEZ VERD, A.", "RODRIGUEZ, B.", "RODRIGUEZ, F.", "RODRIGUEZ, N.", "ROMHANYI, J.", "RONY, F.", "ROOK, K.", "ROSALES, R.", "ROSAS, A.", "ROSE, M.", "ROSEN, A.", "ROSENBERG, S.", "ROSS, L.", "ROSS-HO, A.", "ROSSO, D.", "ROUDER, J.", "RUBALCAVA, B.", "RUBERG, B.", "RUBIO, J.", "RUIZ, S.", "RUMBAUT, R.", "RUNNERSTROM, M.", "RUPERT, T.", "RYAHL, A.", "RYCHNOVSKY, S.", "SABERI, K.", "SADIQ, K.", "SAKAI, A.", "SAKR, Y.", "SALEN, K.", "SALLUM, S.", "SALTZMAN, E.", "SAMEH, C.", "SAMUELSEN, G.", "SANCHEZ, J.", "SANDALSKA, Z.", "SANDERS, B.", "SANDHOLTZ, J.", "SANDMEYER, S.", "SANDRI-GOLDIN, R.", "SANGER, T.", "SANTAGATA, R.", "SAPHORES, J.", "SARNECKA, B.", "SARRAF, G.", "SASMAZ, E.", "SASSON, B.", "SATO, B.", "SCARCELLA, R.", "SCHAEFER, D.", "SCHAFER, K.", "SCHAFER, S.", "SCHEPER, J.", "SCHERSON, I.", "SCHIFFMAN, J.", "SCHILLING, T.", "SCHLICHTER, A.", "SCHLOSSER, S.", "SCHNEIDER, M.", "SCHOEN, R.", "SCHOENUNG, J.", "SCHOFER, E.", "SCHONFELD, W.", "SCHRANK, G.", "SCHREIBER, S.", "SCHRINER, S.", "SCHUCK, S.", "SCHUELLER, S.", "SCHULDT, T.", "SCHULTE, J.", "SCHULTZ, R.", "SCHUSTER, T.", "SCHWAB, G.", "SCHWARZ, C.", "SCHWEGLER, A.", "SCOLNIK, N.", "SCONTRAS, G.", "SCURICH, N.", "SEED, P.", "SEEDS, C.", "SEFAMI, J.", "SEILER, M.", "SELDIN, M.", "SELLGREN, S.", "SEMLER, B.", "SENEAR, D.", "SERESERES, C.", "SESSION, S.", "SEWARD, S.", "SEXTON, J.", "SHAH, N.", "SHAHBABA, B.", "SHAKA, A.", "SHANK, R.", "SHANTHIKUMAR, D.", "SHAPIRO, J.", "SHARP, K.", "SHCHERBAKOV, M.", "SHEA, K.", "SHEN, W.", "SHEN, Y.", "SHEU, C.", "SHEVLIN, T.", "SHI, F.", "SHI, Y.", "SHIELDS, A.", "SHIN, S.", "SHINDLER, M.", "SHIRAIWA, M.", "SHIREY, P.", "SHIRMAN, Y.", "SHKEL, A.", "SHROFF, B.", "SIBLEY, M.", "SIDERIS, A.", "SIEGEL, B.", "SILVER, R.", "SILVER, V.", "SILVERBERG, A.", "SIM, S.", "SIMON, E.", "SIMONSON, D.", "SIMPKINS, S.", "SIMPKINS-CHAPU, S.", "SIMS, R.", "SINGH, K.", "SINGH, S.", "SIRIGNANO, W.", "SIRYAPORN, A.", "SIWY, Z.", "SKAPERDAS, S.", "SKOWRONSKA-KRA, D.", "SKYRMS, B.", "SMECKER-HANE, T.", "SMEDLEY, K.", "SMITH, C.", "SMITH, D.", "SMITH, J.", "SMITH, L.", "SMITH, M.", "SMITH, Q.", "SMITH-NEWMAN, J.", "SMYTH, P.", "SNG, O.", "SNOW, D.", "SNYDER, R.", "SO, K.", "SOBEL, H.", "SODEMANN VILLA, I.", "SODERMAN, A.", "SOJOYNER, D.", "SOK, S.", "SOLINGEN, E.", "SOLINGER, D.", "SOLNA, K.", "SOLODKIN, A.", "SOLTESZ, I.", "SOMMER, S.", "SORKIN, D.", "SOROOSHIAN, S.", "SORTE, C.", "SPANGENBERG, E.", "SPEICH, G.", "SPENCE, M.", "SPERLING, G.", "SPIGHT, D.", "SPITALE, R.", "SQUIRE, K.", "SRINIVASAN, R.", "STAFF", "STAMENKOVIC, V.", "STANFORD, P.", "STARK, C.", "STARR, A.", "STEELE, R.", "STEINBERG-EPST, R.", "STEINKUEHLER, C.", "STEINTRAGER, J.", "STEPAN-NORRIS, J.", "STERN, H.", "STERN-NEZER, S.", "STEWARD, O.", "STEWART, M.", "STEYVERS, M.", "STOEKE, S.", "STOKOLS, D.", "STRAUGHN, I.", "STREETS, J.", "STRIEDTER, G.", "STRINGS, S.", "STROM, S.", "STUCKI, L.", "SU, M.", "SU, Y.", "SUCHARD, J.", "SUDARIO, G.", "SUDDERTH, E.", "SUGIE, N.", "SUH, S.", "SUMIKAWA, K.", "SUN, L.", "SUN, Z.", "SUTTON, S.", "SWANSON, E.", "SWARUP, V.", "SWINDLEHURST, A.", "SWINDLEHURST, L.", "SYKES, B.", "SYMONS, C.", "TAAGEPERA, R.", "TABOREK, P.", "TAFFARD, A.", "TAHA, H.", "TAIT, T.", "TAJIMA, T.", "TALESH, R.", "TAMBINI, A.", "TAN, M.", "TANENBAUM, T.", "TANG, W.", "TANJASIRI, S.", "TATERI, J.", "TAYLOR, D.", "TAYLOR, R.", "TELLES, E.", "TENNER, A.", "TEOH, S.", "TERADA, R.", "TERNG, C.", "TERRICCIANO, A.", "TERRY, J.", "TESLER, M.", "TESTER, A.", "THANO, S.", "THAYER, J.", "THIONG'O, N.", "THOMAS, E.", "THOMAS, J.", "THOMPSON, L.", "THOMPSON, P.", "THOMSEN, D.", "THORNTON, A.", "THORNTON, K.", "TIMBERLAKE, D.", "TINOCO, R.", "TINSLEY, E.", "TINSMAN, H.", "TISO, S.", "TITA, G.", "TOBAR, H.", "TOBIAS, D.", "TOMA-BERGE, S.", "TOMBOLA, F.", "TOMLINSON, C.", "TOMLINSON, W.", "TOPIK, S.", "TOPPER, K.", "TORRES, J.", "TORRES, R.", "TRAMMELL, A.", "TRAN, T.", "TREAS, J.", "TREND, D.", "TRESEDER, K.", "TRIMBLE, V.", "TROMBERG, B.", "TSAI, C.", "TSAI, S.", "TSENG, L.", "TSENG, P.", "TSUDIK, G.", "TUCKER, L.", "TUCKER, S.", "TULLY, D.", "TURNER, J.", "TURNER, S.", "TURNEY, K.", "TYAGI, R.", "U, V.", "UBAN, K.", "UHLANER, C.", "ULIBARRI, N.", "UMEZAKI, K.", "URIU, R.", "UTTS, J.", "VALDEVIT, L.", "VALDEZ, A.", "VALDIVIA ORDOR, C.", "VAN DEN ABBEEL, B.", "VAN DEN ABBEEL, G.", "VAN DER HOEK, A.", "VAN ES, E.", "VAN GINKEL, S.", "VAN VRANKEN, D.", "VANDEKERCKHOVE, J.", "VANDELL, D.", "VANDERWAL, C.", "VARZI, R.", "VAZIRANI, V.", "VEENSTRA, J.", "VEGA, C.", "VEGA, I.", "VEIDENBAUM, A.", "VELAYUDHAN, T.", "VELEZ CUERVO, C.", "VELICOGNA, I.", "VENEGAS, Y.", "VENKATASUBRAMA, N.", "VENUGOPALAN, V.", "VERSHYNIN, R.", "VIACLOVSKY, J.", "VICKERY, L.", "VIEIRA, V.", "VILLAGOMEZ CED, B.", "VILLALTA, S.", "VILLARREAL, L.", "VILLAVICENCIO, A.", "VILLEGAS, J.", "VITTORI, G.", "VO, L.", "VOLOSHINA, A.", "VORTHERMS, S.", "VRUGT, J.", "VU, V.", "WADHWA, P.", "WAGAR, L.", "WALKER, A.", "WALLICK, J.", "WALSBERG, E.", "WALSH, C.", "WALTER, M.", "WAN, D.", "WAN, F.", "WANG, F.", "WANG, S.", "WANG, T.", "WANG, Y.", "WANG, Z.", "WARREN, A.", "WARRIOR, R.", "WARSCHAUER, M.", "WASHINGTON, G.", "WASHINGTON, J.", "WASSERSTROM, J.", "WATANABE KUWAT, M.", "WATERMAN, M.", "WATKINS, C.", "WATTENBERG, M.", "WAY, J.", "WEATHERALL, J.", "WEAVER, H.", "WEBER, L.", "WEHMEIER, K.", "WEISS, G.", "WEISS, J.", "WEITZEL, R.", "WELLMEYER, P.", "WELLS, E.", "WENZEL, L.", "WHEALON, C.", "WHITE, S.", "WHITELEY, J.", "WHITESON, D.", "WHITESON, K.", "WHITING, C.", "WHITT, S.", "WICKRAMASINGHE, H.", "WIE, J.", "WIECHMANN, W.", "WIERSEMA, M.", "WIKENHEISER, J.", "WILDERSON, F.", "WILENTZ, A.", "WILES, T.", "WILK, L.", "WILLIAMS, A.", "WILLIAMS, D.", "WILLIAMS, K.", "WILLIAMS, R.", "WILLOUGHBY, T.", "WILLOUGHBY-HER, T.", "WILSON, R.", "WINIARSKI, C.", "WINTHER TAMAKI, B.", "WISSEH, C.", "WODARZ, D.", "WOJAS, G.", "WOLFSON, J.", "WOLPE, S.", "WON, Y.", "WONG, B.", "WONG, K.", "WONG, N.", "WONG-MA, J.", "WOOD, M.", "WRAY, A.", "WRAY, S.", "WRIGHT, C.", "WRIGHT, T.", "WRIGHT, V.", "WU, J.", "WU, L.", "WU, R.", "WUE, R.", "XIA, J.", "XIANG, L.", "XIE, X.", "XIN, H.", "XIN, J.", "XIN, M.", "XU, D.", "XU, X.", "XUAN, Y.", "YAMADA, J.", "YAMADA, P.", "YAN, G.", "YANG, D.", "YANG, J.", "YANG, Q.", "YASSA, M.", "YEE, A.", "YIM, I.", "YIN, S.", "YOKOMORI, K.", "YONEMOTO, B.", "YOUNG, E.", "YOUNG, N.", "YOUNG, S.", "YOUSEFIZADEH, H.", "YOUSSEFPOUR, H.", "YU, C.", "YU, J.", "YU, Y.", "YU, Z.", "YULIE, T.", "ZALTA, A.", "ZARAGOZA, M.", "ZAREIAN, F.", "ZELL, J.", "ZEMAN, M.", "ZENDER, C.", "ZENG, F.", "ZENYUK, I.", "ZHAN, M.", "ZHANG, J.", "ZHANG, X.", "ZHAO, S.", "ZHAO, W.", "ZHENG, K.", "ZHENG, L.", "ZHOU, P.", "ZHOU, Q.", "ZHOU, Y.", "ZHU, C.", "ZHUANG, J.", "ZINGER, D.", "ZINGER, J.", "ZIOGAS, A.", "ZISSOS, P.", "ZIV, H."];


instructors.forEach((instructor) => {
  $("#instructor-list").append(`<option value="${instructor}">${instructor}</option>`);
});


$("#instructor").on("input", function () {
  if ($("#instructor").val().trim() !== "") {
    $("#instructor").attr("list", "instructor-list");
  } else {
    $("#instructor").removeAttr("list");
  }
});


$(".reset-button").click(function () {
  $("#dept").addClass("select-placeholder");
  $("#quarter").addClass("select-placeholder");
  $("#instructor").removeAttr("list");
});