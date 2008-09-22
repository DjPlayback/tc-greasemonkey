// ==UserScript==
// @name                TCCity
// @version             20070912.3
// @author              hexkid
// @description         Several changes to TornCity ...
// @namespace           http://hexkid.info/GM/
// @include             http://torncity.com/*
// @include             http://www.torncity.com/*
// ==/UserScript==

const TCCity_version = '20070912.3';

// contributors
// TCbasic.com
//   Fluffybunnykins
//   RozarioRivetor
//   Cesar-Valentino
//   Miller
//   Johnny_Chimpo
//   FAQ
//   King_Hobo
//   PhilZero

// TODO in no particular order
//   add possibility to highlight 'things'
//   more rules to highlight prisoners
//   switch order of some stuff on roulette so that the respin button doesn't move
//   highlight and noExpress options on friends and black list
//   remove the '==>' from behind added links
//   Commitment awards (marriage and faction) (with no checking for repeats!!)
//   'Express spy' and 'Express Revive'

/*************************************************************************************************/

// pseudo constants for configuration
var myID = readGMValue('cfg', 'myID', '0', true);
var replaceLoginPage = readGMValue('cfg', 'replaceLoginPage', '0', true);
var mainPic = readGMValue('cfg', 'mainPic', '', true);
var colourDP = readGMValue('cfg', 'colourDP', 'pink', true);
var applyColourDP = readGMValue('cfg', 'applyColourDP', '1', true);
var colourBustee = readGMValue('cfg', 'colourBustee', 'lightgreen', true);
var applyColourBustee = readGMValue('cfg', 'applyColourBustee', '1', true);
var colourFriend = readGMValue('cfg', 'colourFriend', 'lightblue', true);
var applyColourFriend = readGMValue('cfg', 'applyColourFriend', '1', true);
var colourGoodLevel = readGMValue('cfg', 'colourGoodLevel', 'orange', true);
var applyColourGoodLevel = readGMValue('cfg', 'applyColourGoodLevel', '1', true);
var applyTimeReformat = readGMValue('cfg', 'applyTimeReformat', '1', true);
var jailLevelMin = readGMValue('cfg', 'jailLevelMin', '0', true);
var jailLevelMax = readGMValue('cfg', 'jailLevelMax', '0', true);
var hospLevelMin = readGMValue('cfg', 'hospLevelMin', '0', true);
var hospLevelMax = readGMValue('cfg', 'hospLevelMax', '0', true);
var highlightString = readGMValue('cfg', 'highlightID', '', true);
var highlightArray = highlightString.split(/\D+/);
var pokerHeight = readGMValue('cfg', 'pokerHeight', '53', true);
var notepadHeight = readGMValue('cfg', 'notepadHeight', '7', true);
var itemSort1 = readGMValue('cfg', 'itemSort1', '1', true);
var itemSort2 = readGMValue('cfg', 'itemSort2', '0', true);
var itemGroupSize = readGMValue('cfg', 'itemGroupSize', '5', true);

var hideLink_edu = readGMValue('cfg', 'hideLink_edu', '1', true);           // available in the city
var hideLink_news = readGMValue('cfg', 'hideLink_news', '1', true);         // available in the city
var hideLink_jail = readGMValue('cfg', 'hideLink_jail', '1', true);         // available in the city
var hideLink_hospital = readGMValue('cfg', 'hideLink_hospital', '1', true); // available in the city
var hideLink_casino = readGMValue('cfg', 'hideLink_casino', '1', true);     // available in the city
var hideLink_users = readGMValue('cfg', 'hideLink_users', '1', true);       // completely useless
var hideLink_forums = readGMValue('cfg', 'hideLink_forums', '1', true);     // available in the city
var hideLink_chat = readGMValue('cfg', 'hideLink_chat', '1', true);         // never used it, and don't ever intend to use
var hideLink_manual = readGMValue('cfg', 'hideLink_manual', '1', true);     // available in the city
var hideLink_rewards = readGMValue('cfg', 'hideLink_rewards', '1', true);   // available next to points

var addLink_gothere = readGMValue('cfg', 'addLink_gothere', '1', true);
var addLink_notepad = readGMValue('cfg', 'addLink_notepad', '1', true);
var addLink_hof = readGMValue('cfg', 'addLink_hof', '1', true);
var addLink_outbox = readGMValue('cfg', 'addLink_outbox', '1', true);
var addLink_jailItems = readGMValue('cfg', 'addLink_jailItems', '1', true);
var addLink_offences = readGMValue('cfg', 'addLink_offences', '1', true);
var addLink_advanced = readGMValue('cfg', 'addLink_advanced', '1', true);
var addLink_friendsAdv = readGMValue('cfg', 'addLink_friendsAdv', '1', true);
var addLink_enemiesAdv = readGMValue('cfg', 'addLink_enemiesAdv', '1', true);
var addLink_facAttacks = readGMValue('cfg', 'addLink_facAttacks', '1', true);
var addLink_facStaff = readGMValue('cfg', 'addLink_facStaff', '1', true);
var addLink_facMembers = readGMValue('cfg', 'addLink_facMembers', '1', true);
var addLink_facWarBase = readGMValue('cfg', 'addLink_facWarBase', '1', true);
var addLink_facInfo = readGMValue('cfg', 'addLink_facInfo', '1', true);
var addLink_facForum = readGMValue('cfg', 'addLink_facForum', '1', true);
var addLink_facCrime = readGMValue('cfg', 'addLink_facCrime', '1', true);

var statsSpe = readGMValue('cfg', 'statsSpe', '0', true);
var statsStr = readGMValue('cfg', 'statsStr', '0', true);
var statsDef = readGMValue('cfg', 'statsDef', '0', true);
var statsDex = readGMValue('cfg', 'statsDex', '0', true);
var statsTotal = (1 * statsSpe) + (1 * statsStr) + (1 * statsDef) + (1 * statsDex);

var addBattlePercs = readGMValue('cfg', 'addBattlePercs', '1', true);
var addWeaponMults = readGMValue('cfg', 'addWeaponMults', '1', true);
var addRefillBars = readGMValue('cfg', 'addRefillBars', '1', true);
var replaceTickingClock = readGMValue('cfg', 'replaceTickingClock', '0', true);

/*************************************************************************************************/

var uselessLinks = new Array();
{
  var tmp = 0;
  // uselessLinks[][0] is the link proper
  // uselessLinks[][1] is the occurance of the link, used for repeated links
  // uselessLinks[][2] is 0 (don't hide) or 1 (hide)
  uselessLinks[tmp++] = [/^education\.php$/, 1, hideLink_edu];
  uselessLinks[tmp++] = [/^newspaper\.php$/, 1, hideLink_news];
  uselessLinks[tmp++] = [/^jailview\.php$/, 1, hideLink_jail];
  uselessLinks[tmp++] = [/^hospitalview\.php$/, 1, hideLink_hospital];
  uselessLinks[tmp++] = [/^casino\.php$/, 1, hideLink_casino];
  uselessLinks[tmp++] = [/^usersonline\.php$/, 1, hideLink_users];
  uselessLinks[tmp++] = [/^forums\.php$/, 1, hideLink_forums];
  uselessLinks[tmp++] = [/^chat2\.php$/, 1, hideLink_chat];
  uselessLinks[tmp++] = [/^manual\.php$/, 1, hideLink_manual];
  uselessLinks[tmp++] = [/^rewards\.php$/, 2, hideLink_rewards];
}

var arrayThefts = [[1000, 'Sneak&nbsp;Thief'], [2500, 'Prowler'], [5000, 'Safe&nbsp;Cracker']];
var arrayVirus = [[500, 'Ub3rn00b&nbsp;Hacker'], [1000, 'N00b&nbsp;Hacker'], [1500, '1337n00b&nbsp;Hacker'],
                  [2000, 'Ph34r3dn00b&nbsp;Hacker'], [2500, 'Ph34r3d&nbsp;Hacker'], [3000, 'Ph343d1337&nbsp;Hacker'],
                  [3500, 'Ub3rph34r3d&nbsp;Hacker'], [4000, 'Ub3r&nbsp;Hacker'], [4500, '1337&nbsp;Hacker'],
                  [5000, 'Ub3r1337&nbsp;Hacker']];
var arrayMurder = [[1000, 'Beginner&nbsp;Assassin'], [2000, 'Novice&nbsp;Assassin'], [3000, 'Competent&nbsp;Assassin'],
                   [4000, 'Elite&nbsp;Assassin'], [5000, 'Deadly&nbsp;Assassin'], [6000, 'Lethal&nbsp;Assassin']];
var arrayDrugs = [[250, 'Drug&nbsp;Pusher'], [500, 'Drug&nbsp;Runner'], [1000, 'Drug&nbsp;Dealer'],
                  [2000, 'Drug&nbsp;Lord']];
var arrayFraud = [[300, 'Fake'], [600, 'Counterfeit'], [900, 'Pretender'],
                  [1500, 'Imposter'], [2000, 'Pseudo'], [2500, 'Imitation'],
                  [3000, 'Simulated'], [3500, 'Hoax'], [4000, 'Faux']];
var arrayGTA = [[200, 'Gone&nbsp;In&nbsp;300&nbsp;Seconds'], [400, 'Gone&nbsp;In&nbsp;240&nbsp;Seconds'], [600, 'Gone&nbsp;In&nbsp;180&nbsp;Seconds'],
                [800, 'Gone&nbsp;In&nbsp;120&nbsp;Seconds'], [1000, 'Gone&nbsp;In&nbsp;60&nbsp;Seconds'], [1200, 'Gone&nbsp;In&nbsp;30&nbsp;Seconds'],
                [1500, 'Gone&nbsp;In&nbsp;45&nbsp;Seconds'], [2000, 'Gone&nbsp;In&nbsp;15&nbsp;Seconds'], [2500, 'Booster'],
                [3000, 'Joyrider'], [3500, 'Super&nbsp;Booster'], [4000, 'Master&nbsp;Carjacker']];

var bustAwards = new Array();
bustAwards[0] = [250, 'Novice Buster'];
bustAwards[1] = [500, 'Intermediate Buster'];
bustAwards[2] = [1000, 'Advanced Buster'];
bustAwards[3] = [2000, 'Professional Buster'];
bustAwards[4] = [4000, 'Expert Buster'];
bustAwards[5] = [6000, 'Master Buster'];
bustAwards[6] = [8000, 'Guru Buster'];

var jobPromotion = new Array();
jobPromotion['Casino'] = new Array();
  jobPromotion['Casino']['Dealer'] = 2500;
  jobPromotion['Casino']['Gaming Consultant'] = 3500;
  jobPromotion['Casino']['Marketing Manager'] = 5000;
  jobPromotion['Casino']['Revenue Manager'] = 10000;
  jobPromotion['Casino']['Casino Manager'] = 17500;
  jobPromotion['Casino']['Casino President'] = '#NA';
jobPromotion['Grocer'] = new Array();
  jobPromotion['Grocer']['Bag Boy'] = 1500;
  jobPromotion['Grocer']['Price Labeller'] = 1750;
  jobPromotion['Grocer']['Cashier'] = 2100;
  jobPromotion['Grocer']['Food Delivery'] = 2500;
  jobPromotion['Grocer']['Manager'] = '#NA';
jobPromotion['College'] = new Array();
  jobPromotion['College']['Recess Supervisor'] = 3000;
  jobPromotion['College']['Substitute Teacher'] = 4000;
  jobPromotion['College']['Elementary Teacher'] = 6000;
  jobPromotion['College']['Secondary Teacher'] = 8500;
  jobPromotion['College']['Professor'] = 10000;
  jobPromotion['College']['Vice-Principal'] = 17500;
  jobPromotion['College']['Principal'] = '#NA';
jobPromotion['Army'] = new Array();
  jobPromotion['Army']['Private'] = 1200;
  jobPromotion['Army']['Corporal'] = 1500;
  jobPromotion['Army']['Sargeant'] = 1800;
  jobPromotion['Army']['Master Sargeant'] = 2200;
  jobPromotion['Army']['Warrant Officer'] = 2250;
  jobPromotion['Army']['Lieutenant'] = 3250;
  jobPromotion['Army']['Major'] = 5500;
  jobPromotion['Army']['Colonel'] = 7550;
  jobPromotion['Army']['Brigadier'] = 10000;
  jobPromotion['Army']['General'] = '#NA';
jobPromotion['Law'] = new Array();
  jobPromotion['Law']['Law Student'] = 1500;
  jobPromotion['Law']['Paralegal'] = 6000;
  jobPromotion['Law']['Probate Lawyer'] = 7500;
  jobPromotion['Law']['Trial Lawyer'] = 15000;
  jobPromotion['Law']['Circuit Court Judge'] = 25000;
  jobPromotion['Law']['Federal Judge'] = '#NA';
jobPromotion['Hospital'] = new Array();
  jobPromotion['Hospital']['Medical Student'] = 4000;
  jobPromotion['Hospital']['Houseman'] = 6000;
  jobPromotion['Hospital']['Senior Houseman'] = 9500;
  jobPromotion['Hospital']['GP'] = 15000;
  jobPromotion['Hospital']['Consultant'] = 30000;
  jobPromotion['Hospital']['Surgeon'] = 50000;
  jobPromotion['Hospital']['Brain Surgeon'] = '#NA';

var weaponArray = new Array();
if (addWeaponMults == '1') {
  weaponArray['mel'] = new Array();
  weaponArray['mel']['Axe'] = 0;
  weaponArray['mel']['Baseballbat'] = 0.015;
  weaponArray['mel']['BoStaff'] = 0;
  weaponArray['mel']['ButterflyKnife'] = 0.066;
  weaponArray['mel']['ChainWhip'] = 0;
  weaponArray['mel']['Chainsaw'] = 0.45;
  weaponArray['mel']['ClaymoreSword'] = 0.65;
  weaponArray['mel']['Crowbar'] = 0;
  weaponArray['mel']['Dagger'] = 0.08;
  weaponArray['mel']['DualAxes'] = 1.6;
  weaponArray['mel']['DualHammers'] = 1.6;
  weaponArray['mel']['DualSamuraiSwords'] = 1.6;
  weaponArray['mel']['DualScimitars'] = 1.6;
  weaponArray['mel']['Fists'] = 0.005;
  weaponArray['mel']['Hammer'] = 0.01;
  weaponArray['mel']['Kama'] = 0;
  weaponArray['mel']['katana'] = 0;
  weaponArray['mel']['Kitchenknife'] = 0.085;
  weaponArray['mel']['Knuckledusters'] = 0;
  weaponArray['mel']['KodachiSwords'] = 0.95;
  weaponArray['mel']['LeatherBullWhip'] = 0.045; // value calculated by me
  weaponArray['mel']['Ninjaclaws'] = 0.175; // value calculated by me
  weaponArray['mel']['Nunchucks'] = 0;
  weaponArray['mel']['Penknife'] = 0;
  weaponArray['mel']['Rustysword'] = 0;
  weaponArray['mel']['Sai'] = 0;
  weaponArray['mel']['SamuraiSword'] = 0.75;
  weaponArray['mel']['Scimitar'] = 0.25;
  weaponArray['mel']['Spear'] = 0;
  weaponArray['mel']['SwissarmyKnife'] = 0;
  weaponArray['mel']['Taser'] = 0;
  weaponArray['mel']['TwinTigerhooks'] = 0;
  weaponArray['mel']['WandofDestruction'] = 0.76;
  weaponArray['mel']['WushuDoubleAxes'] = 0;
  weaponArray['mel']['YasukuniSword'] = 1.15;

  weaponArray['sec'] = new Array();
  weaponArray['sec']['Beretta92FS'] = 0.4;
  weaponArray['sec']['Blowgun'] = 0;
  weaponArray['sec']['BTMP9'] = 0;
  weaponArray['sec']['CobraDerringer'] = 0;
  weaponArray['sec']['Crossbow'] = 0.31;
  weaponArray['sec']['DesertEagle'] = 0;
  weaponArray['sec']['Dual96GBerettas'] = 1.1;
  weaponArray['sec']['Fireworks'] = 0;
  weaponArray['sec']['Fiveseven'] = 0.5;
  weaponArray['sec']['FlameThrower'] = 1.3;
  weaponArray['sec']['FlareGun'] = 0.026;
  weaponArray['sec']['Glock18'] = 0.05;
  weaponArray['sec']['Lorcin380'] = 0.015;
  weaponArray['sec']['M9'] = 0.23;
  weaponArray['sec']['Magnum'] = 0.65;
  weaponArray['sec']['Qsz92'] = 0;
  weaponArray['sec']['RavenMP25'] = 0.1;
  weaponArray['sec']['RPGLauncher'] = 2.25;
  weaponArray['sec']['Ruger2245'] = 0.15;
  weaponArray['sec']['SWM29'] = 0.4;
  weaponArray['sec']['SWRevolver'] = 0.3;
  weaponArray['sec']['Springfield1911A1'] = 0.2;
  weaponArray['sec']['Taurus'] = 0;
  weaponArray['sec']['USP'] = 0.35;

  weaponArray['pri'] = new Array();
  weaponArray['pri']['9mmUzi'] = 1.25;
  weaponArray['pri']['AK47'] = 0.65;
  weaponArray['pri']['Antitank'] = 2.5;
  weaponArray['pri']['BenelliM1Tactical12Gauge'] = 0.22;
  weaponArray['pri']['BenelliM4Super'] = 0.85;
  weaponArray['pri']['BushmasterCarbon15Type21s'] = 0.5;
  weaponArray['pri']['EggPropelledLauncher'] = 1.02;
  weaponArray['pri']['EnfieldSA80'] = 1.04;
  weaponArray['pri']['HecklerKochSL8'] = 0;
  weaponArray['pri']['Ithaca37'] = 0;
  weaponArray['pri']['Jackhammer'] = 1.8;
  weaponArray['pri']['M16A2Rifle'] = 0.9;
  weaponArray['pri']['M249PARALMG'] = 1.35;
  weaponArray['pri']['M4A1ColtCarbine'] = 0.65;
  weaponArray['pri']['Mag7'] = 0;
  weaponArray['pri']['Minigun'] = 1.6;
  weaponArray['pri']['Mp5Navy'] = 0.35;
  weaponArray['pri']['Neutrilux2000'] = 0;
  weaponArray['pri']['P90'] = 0.45;
  weaponArray['pri']['SawedOffShotgun'] = 0.25;
  weaponArray['pri']['Sig550'] = 0.9;
  weaponArray['pri']['SksCarbine'] = 0;
  weaponArray['pri']['SnowCannon'] = 0;
  weaponArray['pri']['SteyrAUG'] = 1.1;
  weaponArray['pri']['Vektorcr21'] = 0;
  weaponArray['pri']['XM8Rifle'] = 0.5;

  weaponArray['arm'] = new Array();
  weaponArray['arm']['Bodyguard'] = 0.5;
  weaponArray['arm']['BulletproofVest'] = 0;
  weaponArray['arm']['BunnyFur'] = 0;
  weaponArray['arm']['Chainmail'] = 0;
  weaponArray['arm']['FlakJacket'] = 0.15;
  weaponArray['arm']['FlexibleBodyArmour'] = 0.93;
  weaponArray['arm']['FullBodyArmour'] = 0;
  weaponArray['arm']['Interceptor'] = 0.85;
  weaponArray['arm']['KevlarTrenchcoat'] = 0.35;
  weaponArray['arm']['LeatherVest'] = 0.02;
  weaponArray['arm']['LiquidBodyArmour'] = 0;
  weaponArray['arm']['RiotGear'] = 0;
}

/*************************************************************************************************/

// mess with the left menu?
// add User Interface?
// recolor table rows?
// recolor table cells?
// special pages?
//   index.php (normal, jail, hospital, travelling)
//   city.php
//   poker1.php (attention, it's inside a frame of pokerwindow.php)
//   add listing
//   auction market
//   item market
//   notebook
//   criminal records

var donator = false;
{
  var donatorCount = 0;
  if (document.body.innerHTML.match(/title="You are a Torn City donator ~ \d+ days left"/)) ++donatorCount;
  if (document.body.innerHTML.match(/src="images\/icons\/scaled\/subscriber\.gif"/)) ++donatorCount;
  if (donatorCount == 2) donator = true;
}

// get Battle stats from home page
if ((statsTotal > 0) && (document.location.href.match(/\/index\.php$/))) {
  var spe = 0;
  var str = 0;
  var def = 0;
  var dex = 0;

  var rx_spe = /Speed:\s+<font color="#(?:[A-F0-9]{6})">\s+<b>(?:(\d+),)?(\d+\.\d+)<\/b>\s+<br><\/font>/im;
  var rx_str = /Strength:\s+<font color="#(?:[A-F0-9]{6})">\s+<b>(?:(\d+),)?(\d+\.\d+)<\/b>\s+<br><\/font>/im;
  var rx_def = /Defence:\s+<font color="#(?:[A-F0-9]{6})">\s+<b>(?:(\d+),)?(\d+\.\d+)<\/b>\s+<br><\/font>/im;
  var rx_dex = /Dexterity:\s+<font color="#(?:[A-F0-9]{6})">\s+<b>(?:(\d+),)?(\d+\.\d+)<\/b>\s+<br><\/font>/im;

  if (rx_spe.test(document.body.innerHTML)) {
    m = document.body.innerHTML.match(rx_spe);
    spe = 1 * m[2];
    if (m[1]) spe += 1000 * m[1];
  }
  if (rx_str.test(document.body.innerHTML)) {
    m = document.body.innerHTML.match(rx_str);
    str = 1 * m[2];
    if (m[1]) str += 1000 * m[1];
  }
  if (rx_def.test(document.body.innerHTML)) {
    m = document.body.innerHTML.match(rx_def);
    def = 1 * m[2];
    if (m[1]) def += 1000 * m[1];
  }
  if (rx_dex.test(document.body.innerHTML)) {
    m = document.body.innerHTML.match(rx_dex);
    dex = 1 * m[2];
    if (m[1]) dex += 1000 * m[1];
  }

  if (spe && str && def && dex) {
    setGMValue('tmp', 'spe', spe.toString());
    setGMValue('tmp', 'str', str.toString());
    setGMValue('tmp', 'def', def.toString());
    setGMValue('tmp', 'dex', dex.toString());
  } else {
	if (spe == 0) {
		GM_log('Could not parse SPEED stat.');
	}
	if (str == 0) {
		GM_log('Could not parse STRENGTH stat.');
	}
	if (def == 0) {
		GM_log('Could not parse DEFENSE stat.');
	}
	if (dex == 0) {
		GM_log('Could not parse Dexterity stat.');
	}
  }
}

if (replaceLoginPage == '1') {
  // replace login form with a very simple one
  if (document.location.href.match(/\/(index\.php)?$/)) {
    if (document.body.innerHTML.match(/<form name="login" method="post" action="authenticate\.php">/i)) {
      var un = document.body.innerHTML.match(/<input[^>]*name="player"[^>]*value="([^"]*)"/)[1];
      var pw = document.body.innerHTML.match(/<input[^>]*name="password"[^>]*value="([^"]*)"/)[1];
      document.body.innerHTML = '\
<center>\
<form name="login" method="post" action="authenticate.php">\
<input type="hidden" name="save" value="OFF">\
Username: <input type="text" name="player" size="16" value="' + un + '"><br>\
Password: <input type="password" name="password" size="16" value="' + pw + '"><br>\
Save login info: <label><input type="radio" name="save" value="ON" checked="checked">Yes</label> <label><input type="radio" name="save" value="OFF">No</label><br>\
<input type="submit" name="submit">\
</form></center>';
    }
  }
}

// add express train to the gym
if ((statsTotal > 0) && document.location.href.match(/\/(gym.php|validating3\.php\?linknum=\d)$/)) {
  var trainTimesArray = document.body.innerHTML.match(/You can train (\d+) times with the energy you have/);
  if (trainTimesArray && trainTimesArray[1] && (1 * trainTimesArray[1] > 0)) {
    var trainTimes = 1 * trainTimesArray[1];
    var speH = 1 * readGMValue('cfg', 'statsSpe', '1', true);
    var strH = 1 * readGMValue('cfg', 'statsStr', '1', true);
    var defH = 1 * readGMValue('cfg', 'statsDef', '1', true);
    var dexH = 1 * readGMValue('cfg', 'statsDex', '1', true);

    var statsTotalH = speH + strH + defH + dexH;

    var speR = speH / statsTotalH;
    var strR = strH / statsTotalH;
    var defR = defH / statsTotalH;
    var dexR = dexH / statsTotalH;

    var spe = 1 * readGMValue('tmp', 'spe', '1', true);
    var str = 1 * readGMValue('tmp', 'str', '1', true);
    var def = 1 * readGMValue('tmp', 'def', '1', true);
    var dex = 1 * readGMValue('tmp', 'dex', '1', true);
    var total = spe + str + def + dex;

    var speP = spe / total;
    var strP = str / total;
    var defP = def / total;
    var dexP = dex / total;

    var speD = speR - speP;
    var strD = strR - strP;
    var defD = defR - defP;
    var dexD = dexR - dexP;

    var train_ic = 'spe';
    if (dexD > speD && dexD > strD && dexD > defD) {
      train_ic = 'dex';
    }
    if (strD > speD && strD > defD && strD > dexD) {
      train_ic = 'str';
    }
    if (defD > speD && defD > strD && defD > dexD) {
      train_ic = 'def';
    }

    var newdiv = document.createElement('div');
    var newtable = document.createElement('table');
    newdiv.appendChild(newtable);
    var newtbody = document.createElement('tbody');
    newtable.appendChild(newtbody);
    var hdrrow = document.createElement('tr');
    newtbody.appendChild(hdrrow);
    var spehdr = document.createElement('th');
    spehdr.innerHTML = 'Speed';
    if (train_ic == 'spe') spehdr.innerHTML = '<span style="color: red">Speed</span>';
    spehdr.innerHTML += '<br><font size="1"><font color="blue">' + fmtperc(speP) + '%</font><br><font color="green">' + fmtperc(speR) + '%</font></font>';
    hdrrow.appendChild(spehdr);
    var strhdr = document.createElement('th');
    strhdr.innerHTML = 'Strength';
    if (train_ic == 'str') strhdr.innerHTML = '<span style="color: red">Strength</span>';
    strhdr.innerHTML += '<br><font size="1"><font color="blue">' + fmtperc(strP) + '%</font><br><font color="green">' + fmtperc(strR) + '%</font></font>';
    hdrrow.appendChild(strhdr);
    var defhdr = document.createElement('th');
    defhdr.innerHTML = 'Defence';
    if (train_ic == 'def') defhdr.innerHTML = '<span style="color: red">Defence</span>';
    defhdr.innerHTML += '<br><font size="1"><font color="blue">' + fmtperc(defP) + '%</font><br><font color="green">' + fmtperc(defR) + '%</font></font>';
    hdrrow.appendChild(defhdr);
    var dexhdr = document.createElement('th');
    dexhdr.innerHTML = 'Dexterity';
    if (train_ic == 'dex') dexhdr.innerHTML = '<span style="color: red">Dexterity</span>';
    dexhdr.innerHTML += '<br><font size="1"><font color="blue">' + fmtperc(dexP) + '%</font><br><font color="green">' + fmtperc(dexR) + '%</font></font>';
    hdrrow.appendChild(dexhdr);
    var newrow = document.createElement('tr');
    newtbody.appendChild(newrow);
    var specell = document.createElement('td');
    specell.setAttribute('align', 'center');
    specell.style.paddingTop = '12px';
    specell.style.paddingBottom = '12px';
    if (train_ic == 'spe') specell.style.backgroundColor = '#bebf6d';
    newrow.appendChild(specell);
    var strcell = document.createElement('td');
    strcell.setAttribute('align', 'center');
    strcell.style.paddingTop = '12px';
    strcell.style.paddingBottom = '12px';
    if (train_ic == 'str') strcell.style.backgroundColor = '#bebf6d';
    newrow.appendChild(strcell);
    var defcell = document.createElement('td');
    defcell.setAttribute('align', 'center');
    defcell.style.paddingTop = '12px';
    defcell.style.paddingBottom = '12px';
    if (train_ic == 'def') defcell.style.backgroundColor = '#bebf6d';
    newrow.appendChild(defcell);
    var dexcell = document.createElement('td');
    dexcell.setAttribute('align', 'center');
    dexcell.style.paddingTop = '12px';
    dexcell.style.paddingBottom = '12px';
    if (train_ic == 'dex') dexcell.style.backgroundColor = '#bebf6d';
    newrow.appendChild(dexcell);
    for (var i=0; i<trainTimes; ++i) {
      specell.appendChild(createForm('spe', 1+i));
      strcell.appendChild(createForm('str', 1+i));
      defcell.appendChild(createForm('def', 1+i));
      dexcell.appendChild(createForm('dex', 1+i));
    }

    var gymform = document.getElementsByTagName('form')[0];
    gymform.parentNode.insertBefore(newdiv, gymform);
    gymform.style.display = 'none';
  }
  var trainResultArray = document.body.innerHTML.match(/You have gained <b>(\d+\.\d+)<\/b> more (.*) by doing \d+ set\(s\) of .*\./);
  if (trainResultArray && trainResultArray[1] && trainResultArray[2]) {
    var spe = 1 * readGMValue('tmp', 'spe', '1', true);
    var str = 1 * readGMValue('tmp', 'str', '1', true);
    var def = 1 * readGMValue('tmp', 'def', '1', true);
    var dex = 1 * readGMValue('tmp', 'dex', '1', true);
    var val = 1 * trainResultArray[1];
    switch (trainResultArray[2]) {
      case 'speed'    : spe += val; setGMValue('tmp', 'spe', spe.toString()); break;
      case 'strength' : str += val; setGMValue('tmp', 'str', str.toString()); break;
      case 'defence'  : def += val; setGMValue('tmp', 'def', def.toString()); break;
      case 'dexterity': dex += val; setGMValue('tmp', 'dex', dex.toString()); break;
      default: alert('Oops: "' + trainResultArray[2] + '" not expected.'); break;
    }
  }
}

// add User Interface to the city
if (document.location.href.match(/\/city\.php$/)) {
  HTMLSettings();
}

// increase size of text box for profile signature
if (document.location.href.match(/\/preferences\.php\?action=psig$/)) {
  var INPUTs = document.getElementsByTagName('textarea');
  if (INPUTs.length == 1) {
    INPUTs[0].rows = '43';
  }
}

// get time offset from main page when not in jail or hospital
// timeHBar and timeMBar are also used in refill bars function
var timeHBar;
var timeMBar;
var timeSBar;
if ((addRefillBars == '1') || (replaceTickingClock == '1')) {
  var timeArray = document.body.innerHTML.match(/(\d\d):(\d\d):(\d\d)/);
  if (timeArray) {
    timeHBar = 1 * timeArray[1];
    timeMBar = 1 * timeArray[2];
    timeSBar = 1 * timeArray[3];
  }
}
if ((replaceTickingClock == '1') && (document.location.href.match(/\/index\.php$/)) && (document.body.getAttribute('bgcolor') == '#cccccc')) {
  var systemTime = new Date();
  var offsetH = systemTime.getHours() - timeHBar;
  var offsetM = systemTime.getMinutes() - timeMBar;
  var offsetS = systemTime.getSeconds() - timeSBar;
  setGMValue('tmp', 'offsetH', offsetH);
  setGMValue('tmp', 'offsetM', offsetM);
  setGMValue('tmp', 'offsetS', offsetS);
}

  // increase size of chat box in poker
if (document.location.href.match(/\/poker1\.php/)) {
  var chatBox = document.getElementById('Layer1');
  if (chatBox) {
    chatBox.style.height = pokerHeight + 'px';
  }
  var refreshForms = document.getElementsByTagName('form');
  if (refreshForms.length == 1) {
    var refreshForm = refreshForms[0];
    var refreshButtons = refreshForm.getElementsByTagName('input');
    if (refreshButtons.length == 1) {
      var refreshButton = refreshButtons[0];
      if (refreshButton.getAttribute('value') == 'Refresh') {
        var secs = 0;
        var timeoutID;
        var updateButton = function(btn) {
          ++secs;
          btn.setAttribute('value', 'Refresh (' + secs + ' second' + ((secs == 1)?(''):('s')) + ')');
        };
        timeoutID = window.setInterval(updateButton, 1000, refreshButton);
      }
    }
  }
}

// increase size of notepad
if (document.location.href.match(/\/notebook\.php$/)) {
  var TEXTs = document.getElementsByTagName('textarea');
  for (var k=0; k<TEXTs.length; ++k) {
    if (TEXTs[k].hasAttribute('name') && (TEXTs[k].getAttribute('name') == 'notebook')) {
      TEXTs[k].setAttribute('rows', notepadHeight);
    }
  }
}

var showAwards = false;
if (document.location.href.match(/\/criminalrecords\.php$/)) showAwards = true;
var itemTable = null;
var hideRepeats = false;
var hiddenItems = new Array();
if (document.location.href.match(/\/[ai]market\.php\?step=addl$/)) hideRepeats = true;

var TDs = document.getElementsByTagName('td');
var busted = 0;
var busters = 0;
for (var i=0; i<TDs.length; ++i) {
  if (applyColourDP == '1') {
    if (TDs[i].innerHTML.match(/^Donator Pack$/)) {
      TDs[i].parentNode.setAttribute('bgcolor', colourDP);
    }
    if (TDs[i].innerHTML.match(/^<b>Donator Pack<\/b>/)) {
      TDs[i].parentNode.setAttribute('bgcolor', colourDP);
    }
  }
  if (TDs[i].innerHTML.match(/^\[<a href="jail1\.php\?XID=\d+&amp;action=breakout/)) {
    ++busted;
  }
  if (TDs[i].innerHTML.match(/^Was caught trying to break <a[^>]+>[^<]+<\/a> out of jail\.$/)) {
    if (applyColourBustee == '1') TDs[i].parentNode.setAttribute('bgcolor', colourBustee);
    ++busters;
  }
  if ((applyColourGoodLevel == '1') && (TDs[i].innerHTML.match(/^Attacked by (<a[^>]+>[^<]+<\/a>|someone\.)$/))) {
    var cellArray = TDs[i].parentNode.getElementsByTagName('td');
    var hospedLevel = 1 * cellArray[3].innerHTML;
    if ((hospLevelMin <= hospedLevel) && (hospedLevel <= hospLevelMax)) {
      cellArray[3].style.backgroundColor = colourGoodLevel;
      cellArray[4].style.backgroundColor = colourGoodLevel;
    }
  }

  // reformat stock
  STRONGs = TDs[i].getElementsByTagName('strong');
  if (STRONGs.length > 0) {
    if ((STRONGs[0].firstChild.nodeName == 'A') && (STRONGs[0].nextSibling.nodeName == 'A')) {
      STRONGs[0].innerHTML = STRONGs[0].innerHTML.replace(/^(<a href=[^>]+>.+)(&nbsp;){5}<\/a>$/, '$1</a><br>');
      var new_span = document.createElement('span');
      new_span.innerHTML = STRONGs[0].nextSibling.innerHTML.replace(/(&nbsp;){5}\[/gm, '<br>[');
      new_span.innerHTML = new_span.innerHTML.replace(/(&nbsp;){5}$/, '');
      STRONGs[0].parentNode.replaceChild(new_span, STRONGs[0].nextSibling);
    }
  }

  if (hideRepeats) {
    if (TDs[i].innerHTML.match(/^<a href="[ai]market\.php\?step=addl1&amp;ID=\d+">Add<\/a>$/)) {
      itemTable = TDs[i].parentNode.parentNode;
      var itemName = TDs[i].previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
      var itemType = TDs[i].previousSibling.previousSibling.innerHTML;
      var itemID = TDs[i].innerHTML;
      if (itemCount(hiddenItems, itemName) == 0) {
        hiddenItems.push([itemName, [itemType, itemID, 1]]);
      } else {
        var hiddenIndex = 0;
        while (hiddenItems[hiddenIndex][0] != itemName) ++hiddenIndex;
        ++hiddenItems[hiddenIndex][1][2];
      }
      TDs[i].parentNode.style.display = 'none';
    }
  }
  if (showAwards) {
    if (TDs[i].innerHTML.match(/^\d+$/)) {
      var n = TDs[i].innerHTML.match(/^(\d+)$/)[1];
      var t = TDs[i].previousSibling.previousSibling;
      var arr = null;
      if (t.innerHTML == 'Other') {
        t.innerHTML += ' (nerve: 2)';
      }
      if (t.innerHTML == 'Selling illegal products') {
        t.innerHTML += ' (nerve: 3, 16)';
      }
      if (t.innerHTML == 'Theft') {
        t.innerHTML += ' (nerve: 4, 5, 6, 7, 15)';
        arr = arrayThefts;
      }
      if (t.innerHTML == 'Computer crimes') {
        t.innerHTML += ' (nerve: 9, 18)';
        arr = arrayVirus;
      }
      if (t.innerHTML == 'Murder') {
        t.innerHTML += ' (nerve: 10)';
        arr = arrayMurder;
      }
      if (t.innerHTML == 'Drug deals') {
        t.innerHTML += ' (nerve: 8)';
        arr = arrayDrugs;
      }
      if (t.innerHTML == 'Fraud crimes') {
        t.innerHTML += ' (nerve: 11, 13, 14, 17)';
        arr = arrayFraud;
      }
      if (t.innerHTML == 'Auto theft') {
        t.innerHTML += ' (nerve: 12)';
        arr = arrayGTA;
      }

      if (arr != null) {
        var mink = -1;
        for (var k=0; k<arr.length; ++k) {
          if ((mink == -1) && (arr[k][0] > n)) mink = k;
        }
        if (mink >= 0) {
          TDs[i].innerHTML += '&nbsp;(' + arr[mink][1] + '&nbsp;--&nbsp;<b>' + (arr[mink][0] - n) + '</b>)';
        }
      }
    }
  }
}
if (busters > 0) {
  var newinfo = document.createElement('p');
  newinfo.innerHTML = '<i>' + busters + ' caught busting / ' + busted + ' total</i>';
  var HRanchor = document.getElementsByTagName('hr')[1];
  HRanchor.parentNode.insertBefore(newinfo, HRanchor);
}
if (itemTable) {
  var sortFunction = byName;
  var itemsGrouped = false;
  if (readGMValue('cfg', 'itemSort2', '0', true) == '1') {
    sortFunction = byTypeName;
    itemsGrouped = true;
  }
  hiddenItems.sort(sortFunction);
  var oldType = '';
  var colourArray = ['#dfdfdf', '#cccccc'];
  var groupCount = -1;
  for (var k=0; k<hiddenItems.length; ++k) {
    var newItemRow = document.createElement('tr');
    if (!itemsGrouped) {
      newItemRow.setAttribute('bgcolor', colourArray[k % 2]);
    } else {
      if (oldType != hiddenItems[k][1][0]) ++groupCount;
      oldType = hiddenItems[k][1][0];
      newItemRow.setAttribute('bgcolor', colourArray[groupCount % 2]);
    }
    var c1 = document.createElement('td');
    c1.innerHTML = hiddenItems[k][0] + '&nbsp;(' + hiddenItems[k][1][2] + ')';
    var c2 = document.createElement('td');
    c2.innerHTML = hiddenItems[k][1][0];
    var c3 = document.createElement('td');
    c3.innerHTML = hiddenItems[k][1][1];
    newItemRow.appendChild(c1);
    newItemRow.appendChild(c2);
    newItemRow.appendChild(c3);
    itemTable.appendChild(newItemRow);
  }
}

// reorder items by category or auction by time/item/ID
var TABLEs;
var onItemPage = false;
var onAuctionPage = false;
var onIMarketPage = false;
if (document.location.href.match(/\/item\.php$/)) onItemPage = true;
if (document.location.href.match(/\/amarket\.php\?step=type&itype=\w+$/)) onAuctionPage = true;
if (document.location.href.match(/\/imarket\.php\?step=shop&type=\w+/) && (itemGroupSize != '0')) onIMarketPage = true;

if (onItemPage || onAuctionPage || onIMarketPage) {
  TABLEs = document.getElementsByTagName('table');
}

// reformat item page
if (onItemPage || onAuctionPage) {
  for (var kk=0; kk<TABLEs.length; ++kk) {
    var TRs = TABLEs[kk].getElementsByTagName('tr');
    var TD = TRs[0].getElementsByTagName('td')[1];
    if (
          ((onItemPage) && (TD && TD.innerHTML.match(/<font color="#[0-9a-f]{6}"><b>(Styl|Typ)e<\/b><\/font>/)))
          ||
          ((onAuctionPage) && (TD && TD.innerHTML.match(/^Seller$/)))
    ) {
      var rows = new Array();
      for (var ii=1; ii<TRs.length; ++ii) {
        rows.push(TRs[ii].cloneNode(true));
        TRs[ii].style.display = 'none';
      }
      var groupTotal = 0;
      var lastGroup = '';
      if (onItemPage) rows.sort(byCategory);
      if (onAuctionPage) rows.sort(byTimeItemID);
      for (var ii=0; ii<rows.length; ++ii) {
        var lastRow = (ii == rows.length - 1);
        if (applyColourDP == '0') {
          rows[ii].setAttribute('bgcolor', '#dfdfdf');
          if (ii % 2) {
            rows[ii].setAttribute('bgcolor', '#cccccc');
          }
        }
        var thisGroup = rows[ii].getElementsByTagName('td')[1].innerHTML;
        if (onItemPage && (TRs[0].getElementsByTagName('td')[0].innerHTML == '<font color="#000066"><b>Name</b></font>')) {
          if (thisGroup != lastGroup) {
            if (lastGroup != '') {
              // add group total
              var newGroupTotal = document.createElement('tr');
              newGroupTotal.setAttribute('bgcolor', '#cceecc');
              var tmp1 = document.createElement('td');
              tmp1.setAttribute('align', 'right');
              tmp1.innerHTML = 'TOTAL for <b>' + lastGroup + '</b>:';
              newGroupTotal.appendChild(tmp1);
              var tmp2 = document.createElement('td');
              tmp2.setAttribute('colspan', '3');
              tmp2.setAttribute('align', 'right');
              tmp2.innerHTML = fmtAmount(groupTotal);
              newGroupTotal.appendChild(tmp2);
              TABLEs[kk].appendChild(newGroupTotal);
            }
            // reset group total
            groupTotal = 0;
            var thisValue = 1 * rows[ii].getElementsByTagName('td')[3].innerHTML.replace(/\D/g, '');
            groupTotal += thisValue;
            lastGroup = thisGroup;
          } else {
            // add value to running total
            var thisValue = 1 * rows[ii].getElementsByTagName('td')[3].innerHTML.replace(/\D/g, '');
            groupTotal += thisValue;
          }
        }
        TABLEs[kk].appendChild(rows[ii]);
        if (onItemPage && (TRs[0].getElementsByTagName('td')[0].innerHTML == '<font color="#000066"><b>Name</b></font>')) {
          if (lastRow) {
            if (groupTotal >= 0) {
              // add group total
              var newGroupTotal = document.createElement('tr');
              newGroupTotal.setAttribute('bgcolor', '#cceecc');
              var tmp1 = document.createElement('td');
              tmp1.setAttribute('align', 'right');
              tmp1.innerHTML = 'TOTAL for <b>' + lastGroup + '</b>:';
              newGroupTotal.appendChild(tmp1);
              var tmp2 = document.createElement('td');
              tmp2.setAttribute('colspan', '3');
              tmp2.setAttribute('align', 'right');
              tmp2.innerHTML = fmtAmount(groupTotal);
              newGroupTotal.appendChild(tmp2);
              TABLEs[kk].appendChild(newGroupTotal);
            }
            // reset group total
            groupTotal = 0;
            var thisValue = 1 * rows[ii].getElementsByTagName('td')[3].innerHTML.replace(/\D/g, '');
            groupTotal += thisValue;
            lastGroup = thisGroup;
          }
        }
      }
    }
  }
}
if (onIMarketPage) {
  var swapHiddenStatus = function() {
    var infoText = document.getElementById('infoText');
    infoText.style.backgroundColor = 'red';
    infoText.innerHTML = '&nbsp; Please wait... &nbsp;';
    window.setTimeout(swapHiddenStatus2, 2);
  };
  var swapHiddenStatus2 = function() {
    var TRs = document.getElementById('itemTable').getElementsByTagName('tr');
    for (var i=1; i<TRs.length; ++i) {
      if (TRs[i].style) {
        if (TRs[i].style.display == 'none') {
          TRs[i].style.display = 'table-row';
        } else {
          TRs[i].style.display = 'none';
        }
      } else {
        TRs[i].style.display = 'none';
      }
    }
    var infoText = document.getElementById('infoText');
    infoText.style.backgroundColor = '#cccccc';
    infoText.innerHTML = 'Click the top row to switch between server and GM versions of the table.';
  };
  var byItemCost = function(a, b) {
    var aGroup = 1 * a.getAttribute('group');
    var bGroup = 1 * b.getAttribute('group');
    if (aGroup < bGroup) return -1;
    if (aGroup > bGroup) return 1;
    var aItem = a.getElementsByTagName('td')[2].innerHTML;
    var bItem = b.getElementsByTagName('td')[2].innerHTML;
    if (aItem < bItem) return -1;
    if (aItem > bItem) return 1;
    var aCost = 1 * (a.getElementsByTagName('td')[3].innerHTML.replace(/\D/g, ''));
    var bCost = 1 * (b.getElementsByTagName('td')[3].innerHTML.replace(/\D/g, ''));
    if (aCost < bCost) return -1;
    if (aCost > bCost) return 1;
    return 0;
  };
  var itemTable = TABLEs[5];
  itemTable.setAttribute('id', 'itemTable');
  var TRs = itemTable.getElementsByTagName('tr');
  var rows = new Array();
  var items = new Array();
  for (var i=1; i<TRs.length; ++i) {
    var itemName = TRs[i].getElementsByTagName('td')[2].innerHTML;
    if (items[itemName]) {
      ++items[itemName][0];
    } else {
      items[itemName] = new Array();
      items[itemName][0] = 1;
      items[itemName][1] = TRs[i].getElementsByTagName('td')[0].innerHTML;
    }
    if (items[itemName][0] <= (1 * itemGroupSize)) {
      TRs[i].setAttribute('group', items[itemName][1]);
      rows.push(TRs[i].cloneNode(true));
    }
    TRs[i].style.display = 'none';
  }
  rows.sort(byItemCost);
  var colors = ['#dfdfdf', '#cccccc'];
  var groupCount = -1;
  var oldGroup = '';
  for (var i=0; i<rows.length; ++i) {
    if (oldGroup != rows[i].getElementsByTagName('td')[2].innerHTML) {
      ++groupCount;
    }
    rows[i].style.backgroundColor = colors[groupCount % 2];
    itemTable.firstChild.insertBefore(rows[i], null);
    oldGroup = rows[i].getElementsByTagName('td')[2].innerHTML;
  }
  var linkAddListing = document.createElement('a');
  linkAddListing.setAttribute('href', '/imarket.php?step=addl');
  linkAddListing.innerHTML = 'Add Listing';
  itemTable.parentNode.insertBefore(linkAddListing, itemTable);
  itemTable.parentNode.insertBefore(document.createElement('br'), itemTable);
  var infoText = document.createElement('span');
  infoText.setAttribute('id', 'infoText');
  infoText.innerHTML = 'Click the top row to switch between server and GM versions of the table.';
  itemTable.parentNode.insertBefore(infoText, itemTable);
  TRs[0].addEventListener('click', swapHiddenStatus, true);
}

var CITY_done = false;
var MAIL_done = false;
var CRMS_done = false;
var SRCH_done = false;
var FRND_done = false;
var ENMY_done = false;
var FCTN_done = false;
var TIME_done = false;
var GYM_done = false;
var LINKs = document.getElementsByTagName('a');
for (var i=0; i<LINKs.length; ++i) {
  if (LINKs[i].hasAttribute('href')) {
    if (!GYM_done && (LINKs[i].getAttribute('href') == 'gym.php')) {
      if ((addLink_jailItems == '1') && (LINKs[i].innerHTML == 'Jail Gym') && (document.body.getAttribute('bgcolor') == '#cd853f')) {
        var newItemLink = document.createElement('a');
        newItemLink.href = 'item.php';
        newItemLink.innerHTML = 'Items';
        LINKs[i].parentNode.insertBefore(document.createTextNode('\u2022 '), LINKs[i].previousSibling);
        LINKs[i].parentNode.insertBefore(newItemLink, LINKs[i].previousSibling);
        // just added a LINK to the document. All indexes are now wrong :(
        // BAD BAD KLUDGE!!!
        ++i;
        // indexes corrected :)
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].previousSibling);
        GYM_done = true;
      }
    }
    if (!CITY_done && (LINKs[i].getAttribute('href') == 'city.php')) {
      if (addLink_hof == '1') {
        var HOFLink = document.createElement('a');
        HOFLink.setAttribute('href', '/halloffame.php');
        HOFLink.innerHTML = 'HoF';
        LINKs[i].parentNode.insertBefore(HOFLink, LINKs[i].nextSibling);
        var indent = document.createElement('span');
        indent.innerHTML = '&nbsp; &nbsp; ==&gt; ';
        LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }
      if (addLink_notepad == '1') {
        var NPLink = document.createElement('a');
        NPLink.setAttribute('href', '/notebook.php');
        NPLink.innerHTML = 'Notepad';
        LINKs[i].parentNode.insertBefore(NPLink, LINKs[i].nextSibling);
        var indent = document.createElement('span');
        indent.innerHTML = '&nbsp; &nbsp; ==&gt; ';
        LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }
      if (addLink_gothere == '1') {
        LINKs[i].innerHTML += ' <b>&lt;== go there &lt;==</b>';
      }
      CITY_done = true;
    }
    if (!MAIL_done && (LINKs[i].getAttribute('href') == 'messages.php') && (addLink_outbox == '1')) {
      var OBLink = document.createElement('a');
      OBLink.setAttribute('href', 'messages.php?action=outbox');
      OBLink.innerHTML = 'Outbox';
      LINKs[i].parentNode.insertBefore(OBLink, LINKs[i].nextSibling);
      var indent = document.createElement('span');
      indent.innerHTML = '&nbsp; &nbsp;==&gt; ';
      LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
      LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      MAIL_done = true;
    }
    if (!CRMS_done && (LINKs[i].getAttribute('href') == 'crimes.php') && (addLink_offences == '1')) {
      var CRLink = document.createElement('a');
      CRLink.setAttribute('href', 'criminalrecords.php');
      CRLink.innerHTML = 'Offences';
      LINKs[i].parentNode.insertBefore(CRLink, LINKs[i].nextSibling);
      var indent = document.createElement('span');
      indent.innerHTML = '&nbsp; &nbsp;==&gt; ';
      LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
      LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      CRMS_done = true;
    }
    if (!SRCH_done && (LINKs[i].getAttribute('href') == 'search.php') && (addLink_advanced == '1')) {
      var ADVLink = document.createElement('a');
      ADVLink.setAttribute('href', 'advsearch.php');
      ADVLink.innerHTML = 'Advanced';
      LINKs[i].parentNode.insertBefore(ADVLink, LINKs[i].nextSibling);
      var indent = document.createElement('span');
      indent.innerHTML = '&nbsp; &nbsp;==&gt; ';
      LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
      LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      SRCH_done = true;
    }
    if (!FRND_done && (LINKs[i].getAttribute('href') == 'friendlist.php') && (addLink_friendsAdv == '1')) {
      var ADVLink = document.createElement('a');
      ADVLink.setAttribute('href', 'friendlist.php?step=adv');
      ADVLink.innerHTML = 'Advanced';
      LINKs[i].parentNode.insertBefore(ADVLink, LINKs[i].nextSibling);
      LINKs[i].parentNode.insertBefore(document.createTextNode(' | '), LINKs[i].nextSibling);
      FRND_done = true;
    }
    if (!ENMY_done && (LINKs[i].getAttribute('href') == 'blacklist.php') && (addLink_enemiesAdv == '1')) {
      var ADVLink = document.createElement('a');
      ADVLink.setAttribute('href', 'blacklist.php?step=adv');
      ADVLink.innerHTML = 'Advanced';
      LINKs[i].parentNode.insertBefore(ADVLink, LINKs[i].nextSibling);
      LINKs[i].parentNode.insertBefore(document.createTextNode(' | '), LINKs[i].nextSibling);
      ENMY_done = true;
    }
    if (!FCTN_done && (LINKs[i].getAttribute('href') == 'factions.php?step=your')) {
      var indent = document.createElement('span');
      indent.innerHTML = '&nbsp; &nbsp;==&gt; ';

      if (addLink_facCrime == '1') {
        var OCLink = document.createElement('a');
        OCLink.setAttribute('href', 'organisedcrimes.php');
        OCLink.innerHTML = 'Organised Crime';
        LINKs[i].parentNode.insertBefore(OCLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facForum == '1') {
        var ForumLink = document.createElement('a');
        ForumLink.setAttribute('href', 'forums.php?forumID=999&factionID=8216');
        ForumLink.innerHTML = 'Forum';
        LINKs[i].parentNode.insertBefore(ForumLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent.cloneNode(true), LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facMembers == '1') {
        var MembersLink = document.createElement('a');
        MembersLink.setAttribute('href', 'factions.php?step=your&action=members');
        MembersLink.innerHTML = 'Members';
        LINKs[i].parentNode.insertBefore(MembersLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent.cloneNode(true), LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facWarBase == '1') {
        var warBaseLink = document.createElement('a');
        warBaseLink.setAttribute('href', '/factions.php?step=hitlist');
        warBaseLink.innerHTML = 'War Base';
        LINKs[i].parentNode.insertBefore(warBaseLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent.cloneNode(true), LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facInfo == '1') {
        var infoLink = document.createElement('a');
        infoLink.setAttribute('href', '/factions.php?step=your&action=info');
        infoLink.innerHTML = 'Information';
        LINKs[i].parentNode.insertBefore(infoLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent.cloneNode(true), LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facStaff == '1') {
        var staffLink = document.createElement('a');
        staffLink.setAttribute('href', 'facstaff.php');
        staffLink.innerHTML = 'Staff Room';
        LINKs[i].parentNode.insertBefore(staffLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(indent.cloneNode(true), LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createElement('br'), LINKs[i].nextSibling);
      }

      if (addLink_facAttacks == '1') {
        var attacksLink = document.createElement('a');
        attacksLink.setAttribute('href', 'factions.php?step=your&news=2');
        attacksLink.innerHTML = 'attacks';
        LINKs[i].parentNode.insertBefore(attacksLink, LINKs[i].nextSibling);
        LINKs[i].parentNode.insertBefore(document.createTextNode(' | '), LINKs[i].nextSibling);
      }

      FCTN_done = true;
    }
    if (!TIME_done && (LINKs[i].getAttribute('href') == 'playerreport.php')) {
      if (replaceTickingClock == '1') {
        var timeNode = LINKs[i].previousSibling;
        var maxSearchCount = 9;
        while ((maxSearchCount > 0) && !timeNode.textContent.match(/\d\d:\d\d:\d\d/)) {
          --maxSearchCount;
          timeNode = timeNode.previousSibling;
        }
        if ((maxSearchCount == 3) && timeNode.textContent.match(/\d\d:\d\d:\d\d/)) {
          var addASecond = function(spanElement) {
            var h = 1 * spanElement.innerHTML.substr(0, 2);
            var m = 1 * spanElement.innerHTML.substr(3, 2);
            var s = 1 * spanElement.innerHTML.substr(6, 2);
            ++s;
            if (s >= 60) {
              s -= 60;
              ++m;
              if (m >= 60) {
                m -= 60;
                ++h;
                if (h >= 24) {
                  h -= 24;
                }
              }
            }
            spanElement.innerHTML = ('0'+h).substr(-2, 2) + ':' + ('0'+m).substr(-2, 2) + ':' + ('0'+s).substr(-2, 2);
          };
          // var timeArray = timeNode.textContent.match(/(\d\d):(\d\d):(\d\d)/);
          var systemTime = new Date();
          var timeH = (systemTime.getHours()) - (1 * readGMValue('tmp', 'offsetH', '0', true));
          var timeM = (systemTime.getMinutes()) - (1 * readGMValue('tmp', 'offsetM', '0', true));
          var timeS = (systemTime.getSeconds()) - (1 * readGMValue('tmp', 'offsetS', '0', true));
          while (timeS < 0) {
            timeS += 60;
            timeM -= 1;
          }
          while (timeM < 0) {
            timeM += 60;
            timeH -= 1;
          }
          while (timeH < 0) {
            timeH += 24;
          }
          while (timeS >= 60) {
            timeS -= 60;
            timeM += 1;
          }
          while (timeM >= 60) {
            timeM -= 60;
            timeH += 1;
          }
          while (timeH >= 24) {
            timeH -= 24;
          }
          var newTimeSpan = document.createElement('span');
          newTimeSpan.innerHTML = ('0'+timeH).substr(-2, 2) + ':' + ('0'+timeM).substr(-2, 2) + ':' + ('0'+timeS).substr(-2, 2);
          timeNode.textContent = timeNode.textContent.replace(/[0-9:]/g, '');
          timeNode.parentNode.insertBefore(newTimeSpan, timeNode.nextSibling);
          window.setInterval(addASecond, 999, newTimeSpan);
        }
      }
      TIME_done = true;
    }

    if (LINKs[i].getAttribute('href').match(/^jail1\.php\?XID=\d+&action=breakout$/)) {
      if (
            (document.location.href.match(/\/jailview\.php*/))
            ||
            ((document.location.href.match(/\/index\.php$/)) && (document.body.hasAttribute('bgcolor') && (document.body.getAttribute('bgcolor') == '#cd853f')))
         ) {
        // make time and level columns centered
        LINKs[i].parentNode.parentNode.getElementsByTagName('td')[2].setAttribute('align', 'center');
        LINKs[i].parentNode.parentNode.getElementsByTagName('td')[3].setAttribute('align', 'center');
        if (applyTimeReformat == '1') {
          // reformat time left in jail
          var timeLeftCell = LINKs[i].parentNode.parentNode.getElementsByTagName('td')[2];
          var timeLeft = timeLeftCell.innerHTML;
          var timeLeftArray = timeLeft.match(/(?:(\d+) hrs ?)?(?:(\d+) mins)?(?: ?(\d+) secs)?/);
          var timeLeftH = 1 * timeLeftArray[1];
          if (isNaN(timeLeftH)) timeLeftH = 0;
          var timeLeftM = 1 * timeLeftArray[2];
          if (isNaN(timeLeftM)) timeLeftM = 0;
          var timeLeftS = 1 * timeLeftArray[3];
          if (isNaN(timeLeftS)) timeLeftS = 0;
          var timeLeftMinutes = timeLeftH * 60 + timeLeftM;
          timeLeftCell.innerHTML = '';
          //timeLeftCell.innerHTML += timeLeftCell.innerHTML.replace(' ', '&nbsp;', 'g');
          //timeLeftCell.innerHTML += '<br>(';
          timeLeftCell.innerHTML += timeLeftMinutes + '&nbsp;mins';
          if (timeLeftS) timeLeftCell.innerHTML += '&nbsp;' + timeLeftS + '&nbsp;secs';
          //timeLeftCell.innerHTML += ')';
        }
        if (applyColourGoodLevel == '1') {
          // highlight prisoners with a Good Level
          var prisonerLevel = 1 * (LINKs[i].parentNode.parentNode.getElementsByTagName('td')[3].innerHTML);
          if ((jailLevelMin <= prisonerLevel) && (prisonerLevel <= jailLevelMax)) {
            LINKs[i].parentNode.parentNode.getElementsByTagName('td')[3].style.backgroundColor = colourGoodLevel;
          }
        }
      }
    }

    // remove less useful links from left menu
    for (var k=0; k<uselessLinks.length; ++k) {
      if (uselessLinks[k][2] != '0') {
        if (LINKs[i].getAttribute('href').match(uselessLinks[k][0])) {
          --uselessLinks[k][1];
          if (uselessLinks[k][1] == 0) hideUselessLink(LINKs[i]);
        }
      }
    }

    // add job points needed for promotion
    if (LINKs[i].getAttribute('href').match(/^jobpromote\.php$/)) {
      var jp = '';
      var IMGs = document.getElementsByTagName('img');
      for (var jjj=0; jjj<IMGs.length; ++jjj) {
        if (IMGs[jjj].hasAttribute('title')) {
          var jobRX = /^Working in (?:the )?(.*) ~ Rank: (.*)$/;
          if (IMGs[jjj].getAttribute('title').match(jobRX)) {
            var jobtype = RegExp.$1;
            var jobrank = RegExp.$2;
            jp += jobPromotion[jobtype][jobrank];
          }
        }
      }
      LINKs[i].parentNode.insertBefore(document.createTextNode(' (' + jp + ' job points)'), LINKs[i].nextSibling);
    }
  }
}

if (applyColourFriend == '1') {
  // highlight rows with a link to players in highlightArray
  var rxtmp = 'profiles\\.php\\?(action=send&)?XID=(';
  for (var rxk=0; rxk<highlightArray.length; ++rxk) {
    if (rxk > 0) rxtmp += '|';
    rxtmp += highlightArray[rxk];
  }
  rxtmp += ')$';
  var rx = new RegExp(rxtmp);
  // var LINKs = document.getElementsByTagName('a');
  for (var i=0; i<LINKs.length; ++i) {
    if ((LINKs[i].hasAttribute('href') && (LINKs[i].getAttribute('href').match(rx)))) {
      var gp = LINKs[i].parentNode.parentNode;
      if (gp.nodeName == 'TR') {
        gp.setAttribute('bgcolor', colourFriend);
      }
    }
  }
}

// add travel info for each destination
// var LINKs = document.getElementsByTagName('a');
for (var i=0; i<LINKs.length; ++i) {
  if (LINKs[i].hasAttribute('href') && (/^travelagency\.php\?step=\w+$/.test(LINKs[i].getAttribute('href')))) {
    var dest = LINKs[i].getAttribute('href').match(/^travelagency\.php\?step=(\w+)$/);
    var done = false;
    switch (dest[1]) {
      case 'mexico': AddTravelInfo(LINKs[i], 6500, 20, ['AK-47 ($15,000)', 'M249 PARA LMG ($950,000)', '9mm Uzi ($1,100,000)', 'Minigun ($3,000,000)', 'Heckler &amp; Koch SL8 ($45,000)', 'Sig 550 ($55,000)', 'Desert Eagle ($45,000)', 'Dual 96G Berettas ($150,000)', 'Springfield 1911-A1 ($430)', 'Cobra Derringer ($70,000)', 'Flare Gun ($300)', 'Axe ($4,200)', 'Samurai Sword ($75,000)', 'Leather Bull Whip ($1,500)', 'Ninja Claws ($8,000)', 'Taser ($5,500)', 'Bodyguard ($1,000,000)', 'Kevlar Trenchcoat ($500,000)', 'Flak Jacket ($7,500)', 'Claymore Mine ($15,000)'], null, ['Bolt cutters ($25)', 'Mayan Statue ($500)', 'Dahlia ($300)', 'Jaguar plushie ($10,000)', 'Blank Tokens ($100,000)'], null); done=true; break;
      case 'canada': AddTravelInfo(LINKs[i], 9000, 30, ['Ithaca 37 ($10,000)', 'Lorcin380 ($300)', 'S&amp;W M29 ($40,000)'], ['Cannabis', 'Ecstasy', 'LSD', 'PCP', 'Speed', 'Vicodin', 'XanaX'], ['Wolverine plushie ($30)', 'Hockey stick ($400)', 'Crocus ($600)', 'Blank Credit Card ($125,000)'], null); done=true; break;
      case 'hawaii': AddTravelInfo(LINKs[i], 11000, 45, ['Bushmaster Carbon 15 Type 21s ($15,000)', 'Anti Tank ($25,000,000)', 'Taurus ($650)', 'HEG ($20,000)'], null, ['Orchid ($700)', 'Pele Charm ($2,000)'], ['chat box (free to chat, beer: $5, champagne: $75)']); done=true; break;
      case 'uk': AddTravelInfo(LINKs[i], 18000, 90, ['Enfield SA-80 ($250,000)', 'Crossbow ($900)', 'Claymore Sword ($100,000)', 'Stick Grenade ($8,000)', 'Grenade ($10,000)'], ['Cannabis', 'Ecstasy', 'Ketamine', 'PCP', 'Shrooms', 'Vicodin', 'XanaX'], ['Nessie ($200)', 'Heather ($5,000)', 'Red Fox plushie ($1,000)'], null); done=true; break;
      case 'argentina': AddTravelInfo(LINKs[i], 21000, 90, ['Flame thrower ($3,000,000)', 'Liquid body armour ($7,500,000)', 'Tear gas ($15,000)', 'Throwing knife ($35,000)'], null, ['Monkey plushie ($400)', 'Soccer ball ($50)', 'Ceibo flower ($500)'], null); done=true; break;
      case 'switzerland': AddTravelInfo(LINKs[i], 27000, 180, ['Jackhammer ($5,000,000)', 'Swiss Army Knife ($2,500)', 'Flash Grenade ($12,000)'], ['Cannabis', 'Ketamine', 'LSD', 'PCP', 'Shrooms'], ['Chamois ($400)', 'Edelweiss ($900)'], ['rehab center ($250,000)']); done=true; break;
      case 'japan': AddTravelInfo(LINKs[i], 32000, 210, ['BT MP9 ($55,000)', 'Chain Whip ($2,500)', 'Nunchucks ($5,000)', 'Sai ($1,000)', 'Kama ($50,000)', 'Kodachi Swords ($95,000)', 'Flexible Body Armour ($15,000,000)', 'Ninja Stars ($500)'], ['Ecstasy', 'Ketamine', 'Opium', 'Shrooms', 'Speed', 'Vicodin', 'XanaX'], ['Kabuki Mask ($10,000)', 'Maneki Neko ($50,000)', 'Bottle of Sake ($39)', 'Cherry Blossom ($500)'], null); done=true; break;
      case 'china': AddTravelInfo(LINKs[i], 35000, 240, ['Sks carbine ($6,500)', 'Blowgun ($2,500)', 'Fireworks ($500)', 'Qsz-92 ($90,000)', 'Bo Staff ($500)', 'Katana ($16,000)', 'Twin Tiger hooks ($50,000)', 'Wushu Double Axes ($75,000)'], ['Extacy', 'LSD', 'Opium', 'PCP', 'Speed'], ['Panda plushie ($400)', 'Peony ($5,000)', 'Jade Buddha ($12,000)', 'Printing Paper ($75,000)'], ['fortune teller ($75,000)']); done=true; break;
      case 'africa': AddTravelInfo(LINKs[i], 40000, 270, ['Vektor cr 21 ($7,500)', 'Mag 7 ($60,000)', 'Spear ($600)', 'Knuckle Dusters ($750)', 'Interceptor ($3,500,000)', 'Smoke Grenade ($20,000)'], ['LSD', 'Opium', 'PCP', 'Shrooms', 'XanaX'], ['Lion plushie ($400)', 'Elephant Statue ($500)', 'African Violet ($2,000)'], ['hunting ($500 and 10 energy)']); done=true; break;
      default: break;
    }
    if (!done) {
      alert('Destination unknown: ' + dest[1] + '!');
    }
  }
}

var speedFontNode = null;     var speedValue = null;
var strengthFontNode = null;  var strengthValue = null;
var defenceFontNode = null;   var defenceValue = null;
var dexterityFontNode = null; var dexterityValue = null;
var priFontNode = null;
var secFontNode = null;
var melFontNode = null;
var armFontNode = null;
var fontsFound = 0;
var FONTs = document.getElementsByTagName('font');
for (var i=0; i<FONTs.length; ++i) {
  if (FONTs[i].hasAttribute('color')) {
    if (FONTs[i].getAttribute('color') == '#000066') {
      // add direct link to my profile
      if (FONTs[i].innerHTML.match(/^\s[-a-zA-Z]+$/)) {
        var myName = FONTs[i].innerHTML.match(/^\s([-a-zA-Z]+)$/)[1];
        var profileLink = ' [<a href="profiles.php?XID=' + myID + '">' + myName + '</a>]';
        FONTs[i].innerHTML = profileLink;
      }
      if ((addRefillBars == '1') && FONTs[i].innerHTML.match(/\s*(\d+,)*\d+\/(\d+,)*\d+\s*/)) {
        // add time needed to refill bars
        var barType = FONTs[i].previousSibling.textContent.replace(/\s/g, '');
        var numbers = FONTs[i].innerHTML.match(/\s*((\d+,)*(\d+))\/((\d+,)*(\d+))\s*/);
        var currentLength = 1 * numbers[1].replace(/\D/g, '');
        var totalLength = 1 * numbers[4].replace(/\D/g, '');
		
		//Remove the <br> tag from inside the "Happy" <font> tag
		if (barType == 'Happy:') {
			FONTs[i].innerHTML = currentLength.toString() + '/' + totalLength.toString();
		}
		
        switch (barType) {
          case 'Energy:': addBarTime(totalLength - currentLength, 5, (donator)?(10):(15), timeHBar, timeMBar, FONTs[i]); break;
          case 'Happy:': addBarTime(totalLength - currentLength, 5, 15, timeHBar, timeMBar, FONTs[i]); break;
          case 'Nerve:': addBarTime(totalLength - currentLength, 1, 5, timeHBar, timeMBar, FONTs[i]); break;
          case 'Life:': addBarTime(totalLength - currentLength, totalLength / 5, 15, timeHBar, timeMBar, FONTs[i]); break;
          default: alert('Unknown bar type: ' + barType + '!'); break;
        }
      }
      if (document.location.href.match(/\/index\.php$/)) {
        // add bust award and save bust count in prefs.ini
        if (FONTs[i].parentNode.innerHTML.match(/^ People busted: <font color="#000066"> (\d+,)*\d+<\/font>$/)) {
          var bustsS = FONTs[i].parentNode.innerHTML.match(/^ People busted: <font color="#000066"> ((\d+,)*\d+)<\/font>$/)[1];
          var busts = 1 * bustsS.replace(',', '');
          // whatever award in ### busts
          var mink = -1;
          for (var kk=0; kk<bustAwards.length; ++kk) {
            if ((mink == -1) && (bustAwards[kk][0] > busts)) mink = kk;
          }
          if (mink >= 0) {
            FONTs[i].parentNode.innerHTML += ' (' + bustAwards[mink][1] + ' -- <b>' + (bustAwards[mink][0] - busts) + '</b>)';
          }
          setGMValue('tmp', 'bustCount', busts);
        }
      }
    }

    // calculate Battle stats percentages
    if (FONTs[i].getAttribute('color') == '#ff0000') {
      if ((addBattlePercs == '1') || (addWeaponMults == '1')) {
        if (FONTs[i].innerHTML.match(/^\s*(\d+,)*\d+\.\d+\s*(<br>)?$/)) {
          if (FONTs[i].previousSibling.textContent.match(/Speed:/)) {
            speedFontNode = FONTs[i];
            speedValue = 1 * FONTs[i].innerHTML.replace(/[^0-9.]/g, '');
          }
          if (FONTs[i].previousSibling.textContent.match(/Strength:/)) {
            strengthFontNode = FONTs[i];
            strengthValue = 1 * FONTs[i].innerHTML.replace(/[^0-9.]/g, '');
          }
          if (FONTs[i].previousSibling.textContent.match(/Defence:/)) {
            defenceFontNode = FONTs[i];
            defenceValue = 1 * FONTs[i].innerHTML.replace(/[^0-9.]/g, '');
          }
          if (FONTs[i].previousSibling.textContent.match(/Dexterity:/)) {
            dexterityFontNode = FONTs[i];
            dexterityValue = 1 * FONTs[i].innerHTML.replace(/[^0-9.]/g, '');
          }
          if (FONTs[i].previousSibling.textContent.match(/Total:/)) {
            totalFontNode = FONTs[i];
            totalValue = 1 * FONTs[i].innerHTML.replace(/[^0-9.]/g, '');
          }
        }
      }
      if (addWeaponMults == '1') {
        if (FONTs[i].previousSibling && (FONTs[i].previousSibling.textContent.match(/^\s*Primary Weapon:\s*$/))) {
          priFontNode = FONTs[i];
	  ++fontsFound;
        }
        if (FONTs[i].previousSibling && (FONTs[i].previousSibling.textContent.match(/^\s*Secondary Weapon:\s*$/))) {
          secFontNode = FONTs[i];
	  ++fontsFound;
        }
        if (FONTs[i].previousSibling && (FONTs[i].previousSibling.textContent.match(/^\s*Melee Weapon:\s*$/))) {
          melFontNode = FONTs[i];
	  ++fontsFound;
        }
        if (FONTs[i].previousSibling && (FONTs[i].previousSibling.textContent.match(/^\s*Armour:\s*$/))) {
          armFontNode = FONTs[i];
	  ++fontsFound;
        }
      }
    }

    // add number of bust to successful bust
    if (FONTs[i].getAttribute('color') == '#000000') {
      if (document.location.href.match(/\/jail1\.php\?XID=\d+&action=breakout1$/)) {
        if (FONTs[i].innerHTML.match(/<br>You busted [0-9a-zA-Z_-]+ out of jail\.<br>/)) {
          FONTs[i].innerHTML = FONTs[i].innerHTML.replace(/(<br>You busted \w+ out of jail\.<br>)/,
                '$1You have now done (at least) ' + (1 * readGMValue('tmp', 'bustCount', 0, true) + 1) + ' busts.<br>');
        }
      }
    }
  }
}
if (addBattlePercs == '1') {
  if (speedValue && strengthValue && defenceValue && dexterityValue) {
    if (speedFontNode && strengthFontNode && defenceFontNode && dexterityFontNode) {
      var speedPerc = document.createElement('font');
      speedPerc.setAttribute('color', 'blue');
      speedPerc.innerHTML = ' (' + (Math.round(10000 * speedValue / totalValue) / 100) + '%)';
      speedFontNode.insertBefore(speedPerc, speedFontNode.lastChild);
      var strengthPerc = document.createElement('font');
      strengthPerc.setAttribute('color', 'blue');
      strengthPerc.innerHTML = ' (' + (Math.round(10000 * strengthValue / totalValue) / 100) + '%)';
      strengthFontNode.insertBefore(strengthPerc, strengthFontNode.lastChild);
      var defencePerc = document.createElement('font');
      defencePerc.setAttribute('color', 'blue');
      defencePerc.innerHTML = ' (' + (Math.round(10000 * defenceValue / totalValue) / 100) + '%)';
      defenceFontNode.insertBefore(defencePerc, defenceFontNode.lastChild);
      var dexterityPerc = document.createElement('font');
      dexterityPerc.setAttribute('color', 'blue');
      dexterityPerc.innerHTML = ' (' + (Math.round(10000 * dexterityValue / totalValue) / 100) + '%)';
      dexterityFontNode.insertBefore(dexterityPerc, dexterityFontNode.lastChild);
    }
  }
}

if (addWeaponMults && (fontsFound == 4)) {
  if (priFontNode) {
    var priMult = document.createElement('font');
    priMult.color = 'blue';
    priMult.innerHTML = ' (';
    priMult.innerHTML += strengthValue + ' x ' + weaponArray['pri'][priFontNode.textContent.replace(/[^a-z0-9]/ig, '')] + ' = ';
    priMult.innerHTML += fmtDecimalNumber(strengthValue * weaponArray['pri'][priFontNode.textContent.replace(/[^a-z0-9]/ig, '')]);
    priMult.innerHTML += ')';
    priFontNode.insertBefore(priMult, priFontNode.lastChild);
  }
  if (secFontNode) {
    var secMult = document.createElement('font');
    secMult.color = 'blue';
    secMult.innerHTML = ' (';
    secMult.innerHTML += strengthValue + ' x ' + weaponArray['sec'][secFontNode.textContent.replace(/[^a-z0-9]/ig, '')] + ' = ';
    secMult.innerHTML += fmtDecimalNumber(strengthValue * weaponArray['sec'][secFontNode.textContent.replace(/[^a-z0-9]/ig, '')]);
    secMult.innerHTML += ')';
    secFontNode.insertBefore(secMult, secFontNode.lastChild);
  }
  if (melFontNode) {
    var melMult = document.createElement('font');
    melMult.color = 'blue';
    melMult.innerHTML = ' (';
    melMult.innerHTML += strengthValue + ' x ' + weaponArray['mel'][melFontNode.textContent.replace(/[^a-z0-9]/ig, '')] + ' = ';
    melMult.innerHTML += fmtDecimalNumber(strengthValue * weaponArray['mel'][melFontNode.textContent.replace(/[^a-z0-9]/ig, '')]);
    melMult.innerHTML += ')';
    melFontNode.insertBefore(melMult, melFontNode.lastChild);
  }
  if (armFontNode) {
    var armMult = document.createElement('font');
    armMult.color = 'blue';
    armMult.innerHTML = ' (';
    armMult.innerHTML += defenceValue + ' x ' + weaponArray['arm'][armFontNode.textContent.replace(/[^a-z0-9]/ig, '')] + ' = ';
    armMult.innerHTML += fmtDecimalNumber(defenceValue * weaponArray['arm'][armFontNode.textContent.replace(/[^a-z0-9]/ig, '')]);
    armMult.innerHTML += ')';
    armFontNode.insertBefore(armMult, armFontNode.lastChild);
  }
}

// add/remove highlight in profiles
if (document.location.href.match(/\/profiles\.php\?(action=send&)?XID=\d+&?$/)) {
  var xid = document.location.href.match(/\/profiles\.php\?(?:action=send&)?XID=(\d+)&?$/)[1];
  var BOLDs = document.getElementsByTagName('b');
  for (var j=0; j<BOLDs.length; ++j) {
    if (BOLDs[j].innerHTML.match(/^<u>Actions:<\/u>$/)) {
      ProfileSettings(xid, BOLDs[j]);
    }
  }
}

// add title to images with alt and no title
var IMGs = document.getElementsByTagName('img');
for (var i=0; i<IMGs.length; ++i) {
  if (IMGs[i].hasAttribute('alt')) {
    if (!IMGs[i].hasAttribute('title')) {
      IMGs[i].setAttribute('title', IMGs[i].getAttribute('alt'));
    }
  }
  if (IMGs[i].hasAttribute('name')) {
    if (document.location.href.match(/\/(index\.php)?$/)) {
      if (document.body.getAttribute('bgcolor') == '#cccccc') {
        changeMainPic(IMGs[i]);
      }
    }
  }
}

// add ammo count to sell ammo page
if (document.location.href.match(/\/ammo\.php\?step=sell/)) {
  var BOXs = document.getElementsByTagName('input');
  var oldGun = '';
  var gunCount = 0;
  for (var i=0; i<BOXs.length; ++i) {
    if (BOXs[i].hasAttribute('type') && (BOXs[i].getAttribute('type') == 'checkbox')) {
      gun = BOXs[i].parentNode.parentNode.childNodes[1].innerHTML;
      if (gun != oldGun) gunCount = 0;
      oldGun = gun;
      ++gunCount;
      BOXs[i].parentNode.appendChild(document.createTextNode(' ' + gunCount));
    }
  }
}

/*************************************************************************************************/

function addBarTime(ticks, increase, every, currH, currM, spot) {
  var spanLeft = document.createElement('span');
  spanLeft.style.color = 'green';
  spanLeft.style.fontSize = 'smaller';
  if (ticks <= 0) {
    spanLeft.innerHTML = ' (FULL!)';
  } else {
    // var minsLeft = 1 + (ticks * every / increase); //alert(ticks + ' ' + every + ' ' + increase + ' ' + minsLeft);
    var minsLeft = 0;
    while (ticks > 0) {
      minsLeft += every;
      ticks -= increase;
    }
    currM += minsLeft;
    while (currM > 59) {
      currM -= 60;
      ++currH;
    }
    if (currH > 23) currH -= 24;
    while (currM % every != 0) --currM;
    spanLeft.innerHTML = ' (' + ('0' + currH).substr(-2, 2) + ':' + ('0' + currM).substr(-2, 2) + ')';
  }
  spot.parentNode.insertBefore(spanLeft, spot.nextSibling);
}

function hideUselessLink(link) {
  link.style.display = 'none';
  link.previousSibling.textContent = '';
  link.previousSibling.previousSibling.style.display = 'none';
}

function itemCount(arr, ele) {
  var k = 0;
  for (var i=0; i<arr.length; ++i) {
    if (arr[i][0] == ele) ++k;
  }
  return k;
}

function byName(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

function byTypeName(a, b) {
  if (a[1][0] < b[1][0]) return -1;
  if (a[1][0] > b[1][0]) return 1;
  return byName(a, b);
}

function byCategory(a, b) {
  var a2 = a.getElementsByTagName('td')[1].innerHTML;
  var b2 = b.getElementsByTagName('td')[1].innerHTML;
  if (a2 < b2) return -1;
  if (a2 > b2) return 1;
  var a1 = 1 * a.getElementsByTagName('td')[2].innerHTML.replace(/\D/g, '');
  var b1 = 1 * b.getElementsByTagName('td')[2].innerHTML.replace(/\D/g, '');
  if (a1 < b1) return -1;
  if (a1 > b1) return 1;
  return 0;
}

function byTimeItemID(a, b) {
  var a3 = 1 * a.getElementsByTagName('td')[5].innerHTML.replace(/^(<font color="#[0-9a-f]{6}">)?(\d+)(<\/font>)?$/, '$2');
  var b3 = 1 * b.getElementsByTagName('td')[5].innerHTML.replace(/^(<font color="#[0-9a-f]{6}">)?(\d+)(<\/font>)?$/, '$2');
  if (a3 < b3) return -1;
  if (a3 > b3) return 1;
  var a2 = a.getElementsByTagName('td')[2].innerHTML;
  var b2 = b.getElementsByTagName('td')[2].innerHTML;
  if (a2 < b2) return -1;
  if (a2 > b2) return 1;
  var a1 = a.getElementsByTagName('td')[7].innerHTML;
  var b1 = b.getElementsByTagName('td')[7].innerHTML;
  if (a1 < b1) return -1;
  if (a1 > b1) return 1;
  return 0;
}

function AddTravelInfo(anchor, value, time, weapon, drug, special, activity) {
  var TInfo = document.createElement('div');
  TInfo.style.marginLeft = '34px';
  TInfo.innerHTML = '<b>price</b>: $' + value + '; <b>time</b>: ' + time + ' minutes each way (' + time*2/5 + ' nerve, ' + Math.round(time*10/((donator)?(10):(15)), 0) + ' energy)<br>';
  if (weapon) {
    TInfo.innerHTML += '<b>weapons</b>: ';
    for (var j=0; j<weapon.length; ++j) {
      if (j>0) TInfo.innerHTML += ', ';
      TInfo.innerHTML += weapon[j];
    }
    TInfo.innerHTML += '<br>';
  }
  if (drug) {
    TInfo.innerHTML += '<b>drugs</b>: ';
    for (var j=0; j<drug.length; ++j) {
      if (j>0) TInfo.innerHTML += ', ';
      TInfo.innerHTML += drug[j];
    }
    TInfo.innerHTML += '<br>';
  }
  if (special) {
    TInfo.innerHTML += '<b>special</b>: ';
    for (var j=0; j<special.length; ++j) {
      if (j>0) TInfo.innerHTML += ', ';
      TInfo.innerHTML += special[j];
    }
    TInfo.innerHTML += '<br>';
  }
  if (activity) {
    TInfo.innerHTML += '<b>activity</b>: ';
    for (var j=0; j<activity.length; ++j) {
      if (j>0) TInfo.innerHTML += ', ';
      TInfo.innerHTML += activity[j];
    }
  }
  anchor.parentNode.insertBefore(TInfo, anchor.nextSibling);
}

function readGMValue(suffix, name, defaultValue, createEntry) {
  var realname = suffix;
  if (realname != '') realname += '-';
  realname += name;
  var cfgVariable = GM_getValue(realname);
  if (cfgVariable == null) {
    cfgVariable = defaultValue;
    if (createEntry) GM_setValue(realname, cfgVariable);
  }
  return cfgVariable;
}

function setGMValue(suffix, name, value) {
  var realname = suffix;
  if (realname != '') realname += '-';
  realname += name;
  GM_setValue(realname, value);
}

function changeMainPic(img) {
  if (mainPic != '') {
    img.setAttribute('src', mainPic);
    img.setAttribute('width', '350px');
    img.setAttribute('height', '300px');
  }
}

function HTMLSettings() {
  var fxtext = function(x) {
    setGMValue('cfg', x.target.id, x.target.value);
    if (x.target.id == 'colourDP') document.getElementById('exDP').style.backgroundColor = x.target.value;
    if (x.target.id == 'colourBustee') document.getElementById('exBustee').style.backgroundColor = x.target.value;
    if (x.target.id == 'colourFriend') document.getElementById('exHighlight').style.backgroundColor = x.target.value;
    if (x.target.id == 'colourGoodLevel') document.getElementById('exLevel').style.backgroundColor = x.target.value;
  };
  var fxchkb = function(x) {
    setGMValue('cfg', x.target.id, x.target.checked?'1':'0');
  };
  var fxrdio = function(x) {
    setGMValue('cfg', x.target.id, '1');
    switch (x.target.id) {
      case 'itemSort1': setGMValue('cfg', 'itemSort2', '0'); break;
      case 'itemSort2': setGMValue('cfg', 'itemSort1', '0'); break;
      default: break;
    }
  }

  var UIdiv = document.createElement('div');
  UIdiv.style.textAlign = 'center';
  UIdiv.style.margin = '30px 30px 30px 30px';
  UIdiv.style.padding = '30px 30px 30px 30px';
  UIdiv.style.backgroundColor = '#ccddcc';
  UIdiv.innerHTML = '\
<h2>Greasemonkey Settings</h2>\
<h4><a href="http://hexkid.info/GM/tccity.html">version ' + TCCity_version + '</a></h4>\
<hr>\
<table border="1" width="100%">\
  <tr>\
    <td>\
      My ID: <input type="text" id="myID" size="7" style="padding-left: 2px">\
    </td><td colspan="2"><label><input type="checkbox" id="replaceLoginPage">Replace login page with a <b>very simple</b> one<label></td>\
  </tr><tr>\
    <td>\
      <b>Colours:</b><br>\
      &nbsp;&nbsp;<input type="checkbox" id="applyColourDP"> Donation Pack: <input type="text" id="colourDP" size="8" style="padding-left: 2px"><br>\
      &nbsp;&nbsp;<input type="checkbox" id="applyColourFriend"> Highlight: <input type="text" id="colourFriend" size="8" style="padding-left: 2px"><br>\
      &nbsp;&nbsp;<input type="checkbox" id="applyColourBustee"> People caught attempting to bust: <input type="text" id="colourBustee" size="8" style="padding-left: 2px"><br>\
      &nbsp;&nbsp;<input type="checkbox" id="applyTimeReformat"> Reformat Jail time<br>\
      &nbsp;&nbsp;<input type="checkbox" id="applyColourGoodLevel"> Good level in jail or attacked in hospital: <input type="text" id="colourGoodLevel" size="8" style="padding-left: 2px"><br>\
      <table>\
      <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jail level</td><td>min: <input type="text" id="jailLevelMin" size="2" style="padding-left: 2px"></td><td>max: <input type="text" id="jailLevelMax" size="2" style="padding-left: 2px"></td></tr>\
      <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hospital level</td><td>min: <input type="text" id="hospLevelMin" size="2" style="padding-left: 2px"></td><td>max: <input type="text" id="hospLevelMax" size="2" style="padding-left: 2px"></td></tr>\
      </table>\
      <br>\
      <b>Height of notepad</b>: <input type="text" id="notepadHeight" size="4" style="padding-left: 2px"> (lines)<br>\
      <br>\
      <b>When adding items to the item/auction market</b>:<br>\
      &nbsp;&nbsp;<label><input type="radio" id="itemSort1" name="itemSort"> Order by name</label><br>\
      &nbsp;&nbsp;<label><input type="radio" id="itemSort2" name="itemSort"> Group by type, then order by name</label><br>\
      <br>\
      <label>Group size for item market: <input type="text" id="itemGroupSize" size="3" style="padding-left: 2px"> (0 to disable)</label>\
    </td><td align="center">\
      <br>\
      <table border="1" style="background-color: #cccccc">\
        <tr><td>Empty row</td><td>&nbsp;--&nbsp;</td></tr>\
        <tr id="exDP"><td>donator</td><td>&nbsp;pack&nbsp;</td></tr>\
        <tr><td>Empty row</td><td>&nbsp;--&nbsp;</td></tr>\
        <tr id="exHighlight"><td>Highlight</td><td>&nbsp;player&nbsp;</td></tr>\
        <tr><td>Empty row</td><td>&nbsp;--&nbsp;</td></tr>\
        <tr id="exBustee"><td>failed</td><td>&nbsp;bust&nbsp;</td></tr>\
        <tr><td>Empty row</td><td>&nbsp;--&nbsp;</td></tr>\
        <tr><td>Good level</td><td id="exLevel">&nbsp;42&nbsp;</td></tr>\
        <tr><td>Empty row</td><td>&nbsp;--&nbsp;</td></tr>\
      </table>\
      <br>\
    </td><td>\
      <table width="100%"><tr><td width="50%">\
        <b>Links to hide:</b><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_edu"> Education</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_news"> Newspaper</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_jail"> Jail</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_hospital"> Hospital</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_casino"> Casino</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_users"> Users Online</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_forums"> Forums</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_chat"> Chat</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_manual"> Manual</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="hideLink_rewards"> Rewards</label><br>\
      </td><td width="50%">\
        <b>Links to add:</b><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_gothere"> &lt;== go there &lt;==</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_notepad"> Notepad</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_hof"> HoF</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_outbox"> Outbox</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_jailItems"> Items (while in jail)</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_offences"> Offences</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_advanced"> Advanced Search</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_friendsAdv"> Advanced Friends</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_enemiesAdv"> Advanced Enemies</label><br>\
        <b>Faction links:</b><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facAttacks"> Faction attacks</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facStaff"> Staff Room</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facMembers"> Faction members</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facWarBase"> War Base</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facInfo"> Information</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facForum"> Faction forum</label><br>\
        &nbsp;&nbsp;<label><input type="checkbox" id="addLink_facCrime"> Faction OC</label><br>\
      </td></tr></table>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      Battle stats distribution:\
      <table>\
        <tr><td align="right"><label>Speed:</td><td><input type="text" id="statsSpe" size="3" style="padding-left: 2px"></label></td></tr>\
        <tr><td align="right"><label>Strength:</td><td><input type="text" id="statsStr" size="3" style="padding-left: 2px"></label></td></tr>\
        <tr><td align="right"><label>Defence:</td><td><input type="text" id="statsDef" size="3" style="padding-left: 2px"></label></td></tr>\
        <tr><td align="right"><label>Dexterity:</td><td><input type="text" id="statsDex" size="3" style="padding-left: 2px"></label></td></tr>\
        <tr><td colspan="2">Specify 0 (zero) for all stats to disable \'Express Train\'.</td></tr>\
      </table>\
    </td><td>\
      <label><input type="checkbox" id="addBattlePercs"> Add Battle Percentages</label><br>\
      <label><input type="checkbox" id="addWeaponMults"> Add Weapon Multipliers</label><br>\
      <label><input type="checkbox" id="addRefillBars"> Add time when bars refill</label><br>\
      <label><input type="checkbox" id="replaceTickingClock"> Replace clock by a ticking clock</label>\
    </td><td>\
      <label>\
        URL of pic to replace house in Home page (keep blank for default image):<br>\
        <input type="text" id="mainPic" size="44" style="padding-left: 2px">\
      </label><br>\
      <br>\
      <label>Height of chat window in poker: <input type="text" id="pokerHeight" size="4" style="padding-left: 2px"> (pixels)</label><br>\
    </td>\
  </tr>\
</table>\
<p>\
<i>\
Script developed by <a href="profiles.php?XID=421738">hexkid</a> (donations not necessary <img src="images/face_05.gif">, suggestions welcome)<br>\
</i></p>';
  document.body.appendChild(UIdiv);
  var elem;

  // myID
  elem = document.getElementById('myID');
  elem.setAttribute('value', myID);
  elem.addEventListener('change', fxtext, true);
  // replaceLoginPage
  elem = document.getElementById('replaceLoginPage');
  if (replaceLoginPage == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // mainPic
  elem = document.getElementById('mainPic');
  elem.setAttribute('value', mainPic);
  elem.addEventListener('change', fxtext, true);
  // colourDP
  elem = document.getElementById('colourDP');
  elem.setAttribute('value', colourDP);
  elem.addEventListener('change', fxtext, true);
  document.getElementById('exDP').style.backgroundColor = colourDP;
  // applyColourDP
  elem = document.getElementById('applyColourDP');
  if (applyColourDP == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // colourBustee
  elem = document.getElementById('colourBustee');
  elem.setAttribute('value', colourBustee);
  elem.addEventListener('change', fxtext, true);
  document.getElementById('exBustee').style.backgroundColor = colourBustee;
  // applyColourBustee
  elem = document.getElementById('applyColourBustee');
  if (applyColourBustee == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // colourFriend
  elem = document.getElementById('colourFriend');
  elem.setAttribute('value', colourFriend);
  elem.addEventListener('change', fxtext, true);
  document.getElementById('exHighlight').style.backgroundColor = colourFriend;
  // applyColourFriend
  elem = document.getElementById('applyColourFriend');
  if (applyColourFriend == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // colourGoodLevel
  elem = document.getElementById('colourGoodLevel');
  elem.setAttribute('value', colourGoodLevel);
  elem.addEventListener('change', fxtext, true);
  document.getElementById('exLevel').style.backgroundColor = colourGoodLevel;
  // applyColourGoodLevel
  elem = document.getElementById('applyColourGoodLevel');
  if (applyColourGoodLevel == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // applyTimeReformat
  elem = document.getElementById('applyTimeReformat');
  if (applyTimeReformat == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // jailLevelMin
  elem = document.getElementById('jailLevelMin');
  elem.setAttribute('value', jailLevelMin);
  elem.addEventListener('change', fxtext, true);
  // jailLevelMax
  elem = document.getElementById('jailLevelMax');
  elem.setAttribute('value', jailLevelMax);
  elem.addEventListener('change', fxtext, true);
  // hospLevelMin
  elem = document.getElementById('hospLevelMin');
  elem.setAttribute('value', hospLevelMin);
  elem.addEventListener('change', fxtext, true);
  // hospLevelMax
  elem = document.getElementById('hospLevelMax');
  elem.setAttribute('value', hospLevelMax);
  elem.addEventListener('change', fxtext, true);
  // pokerHeight
  elem = document.getElementById('pokerHeight');
  elem.setAttribute('value', pokerHeight);
  elem.addEventListener('change', fxtext, true);
  // notepadHeight
  elem = document.getElementById('notepadHeight');
  elem.setAttribute('value', notepadHeight);
  elem.addEventListener('change', fxtext, true);
  // itemSort1
  elem = document.getElementById('itemSort1');
  if (itemSort1 == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxrdio, true);
  // itemSort2
  elem = document.getElementById('itemSort2');
  if (itemSort2 == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxrdio, true);
  // itemGroupSize
  elem = document.getElementById('itemGroupSize');
  elem.setAttribute('value', itemGroupSize);
  elem.addEventListener('change', fxtext, true);

  // hideLink_edu
  elem = document.getElementById('hideLink_edu');
  if (hideLink_edu == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_news
  elem = document.getElementById('hideLink_news');
  if (hideLink_news == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_jail
  elem = document.getElementById('hideLink_jail');
  if (hideLink_jail == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_hospital
  elem = document.getElementById('hideLink_hospital');
  if (hideLink_hospital == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_casino
  elem = document.getElementById('hideLink_casino');
  if (hideLink_casino == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_users
  elem = document.getElementById('hideLink_users');
  if (hideLink_users == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_forums
  elem = document.getElementById('hideLink_forums');
  if (hideLink_forums == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_chat
  elem = document.getElementById('hideLink_chat');
  if (hideLink_chat == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_manual
  elem = document.getElementById('hideLink_manual');
  if (hideLink_manual == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // hideLink_rewards
  elem = document.getElementById('hideLink_rewards');
  if (hideLink_rewards == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_gothere
  elem = document.getElementById('addLink_gothere');
  if (addLink_gothere == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_notepad
  elem = document.getElementById('addLink_notepad');
  if (addLink_notepad == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_hof
  elem = document.getElementById('addLink_hof');
  if (addLink_hof == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_outbox
  elem = document.getElementById('addLink_outbox');
  if (addLink_outbox == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_jailItems
  elem = document.getElementById('addLink_jailItems');
  if (addLink_jailItems == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_offences
  elem = document.getElementById('addLink_offences');
  if (addLink_offences == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_advanced
  elem = document.getElementById('addLink_advanced');
  if (addLink_advanced == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_friendsAdv
  elem = document.getElementById('addLink_friendsAdv');
  if (addLink_friendsAdv == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_enemiesAdv
  elem = document.getElementById('addLink_enemiesAdv');
  if (addLink_enemiesAdv == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facAttacks
  elem = document.getElementById('addLink_facAttacks');
  if (addLink_facAttacks == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facStaff
  elem = document.getElementById('addLink_facStaff');
  if (addLink_facStaff == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facMembers
  elem = document.getElementById('addLink_facMembers');
  if (addLink_facMembers == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facWarBase
  elem = document.getElementById('addLink_facWarBase');
  if (addLink_facWarBase == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facInfo
  elem = document.getElementById('addLink_facInfo');
  if (addLink_facInfo == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facForum
  elem = document.getElementById('addLink_facForum');
  if (addLink_facForum == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addLink_facCrime
  elem = document.getElementById('addLink_facCrime');
  if (addLink_facCrime == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);

  // statsSpe
  elem = document.getElementById('statsSpe');
  elem.setAttribute('value', statsSpe);
  elem.addEventListener('change', fxtext, true);
  // statsStr
  elem = document.getElementById('statsStr');
  elem.setAttribute('value', statsStr);
  elem.addEventListener('change', fxtext, true);
  // statsDef
  elem = document.getElementById('statsDef');
  elem.setAttribute('value', statsDef);
  elem.addEventListener('change', fxtext, true);
  // statsDex
  elem = document.getElementById('statsDex');
  elem.setAttribute('value', statsDex);
  elem.addEventListener('change', fxtext, true);

  // addBattlePercs
  elem = document.getElementById('addBattlePercs');
  if (addBattlePercs == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addWeaponMults
  elem = document.getElementById('addWeaponMults');
  if (addWeaponMults == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // addRefillBars
  elem = document.getElementById('addRefillBars');
  if (addRefillBars == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
  // replaceTickingClock
  elem = document.getElementById('replaceTickingClock');
  if (replaceTickingClock == '1') elem.setAttribute('checked', 'checked');
  elem.addEventListener('click', fxchkb, true);
}

function ProfileSettings(xid, loc) {
  var fxchkb1 = function(x) {
    if (x.target.checked) {
      highlightArray.splice(0, 0, xid);
      highlightArray.sort(function(a,b){return a-b;});
    } else {
      highlightArray.splice(highlightArray.indexOf(xid), 1);
    }
    highlightString = highlightArray.join(', ');
    setGMValue('cfg', x.target.id, highlightString);
  };

  if (false) {
    // add spy and revive buttons
    var specialRow = document.createElement('tr');
    var specialCell = document.createElement('td');
    specialCell.setAttribute('colspan', '2');
    specialCell.innerHTML = '<form style="display: inline"><input type="submit" value="Spy" disabled="disabled"></form><form style="display: inline"><input type="submit" value="Revive" disabled="disabled"></form>';
    specialRow.appendChild(specialCell);
    loc.parentNode.parentNode.parentNode.appendChild(specialRow);

    // add battle and work stats from spy
    var statsString = readGMValue('tmp', 'stats' + xid, '', false);
    if (statsString != '') {
      var newStatsRow = document.createElement('tr');
      var newBattleCell = document.createElement('td');
      newBattleCell.innerHTML = '<b>Battle Stats:</b><br>';
      newBattleCell.innerHTML += 'Speed (@ 20070710): <font color="red">#NA</font><br>';
      newBattleCell.innerHTML += 'Strength (@ 20070710): <font color="red">#NA</font><br>';
      newBattleCell.innerHTML += 'Defence (@ 20070710): <font color="red">#NA</font><br>';
      newBattleCell.innerHTML += 'Dexterity (@ 20070710): <font color="red">#NA</font><br>';
      newBattleCell.innerHTML += 'Total (@ 20070710): <font color="red">#NA</font><br>';
      newStatsRow.appendChild(newBattleCell);
      var newWorkCell = document.createElement('td');
      newWorkCell.innerHTML = '<b>Working Stats:</b><br>';
      newWorkCell.innerHTML += 'Manual labour (@ 20070710): <font color="green">#NA</font><br>';
      newWorkCell.innerHTML += 'Intelligence (@ 20070710): <font color="green">#NA</font><br>';
      newWorkCell.innerHTML += 'Endurance (@ 20070710): <font color="green">#NA</font><br>';
      newStatsRow.appendChild(newWorkCell);
      loc.parentNode.parentNode.parentNode.appendChild(newStatsRow);
    }
  }

  // add checkbox for "profile highlighted"
  var newrow = document.createElement('tr');
  var newcell = document.createElement('td');
  newrow.style.textAlign = 'center';
  newrow.style.margin = '30px 30px 30px 30px';
  newrow.style.padding = '30px 30px 30px 30px';
  newrow.style.backgroundColor = '#ccddcc';
  newcell.setAttribute('colspan', '2');
  newcell.innerHTML = '\
<label><input type="checkbox" id="highlightID"> Highlight in lists/messages/forums</label><br>\
';
  newrow.appendChild(newcell);
  loc.parentNode.parentNode.parentNode.appendChild(newrow);
  var elem;

  // highlightID
  elem = document.getElementById('highlightID');
  if (highlightArray.indexOf(xid) >= 0) {
    elem.setAttribute('checked', 'checked');
  }
  elem.addEventListener('click', fxchkb1, true);
}

function fmtperc(x) {
  var y = x * 10000;
  y = Math.floor(y + 0.5) + 0.5;
  y /= 100;
  y += 0.00001;
  var yy = y.toString();
  var dotpos = yy.indexOf('.');
  return yy.substr(0, dotpos + 3);
}

function fmtNumber(n) {
  var x = n.toString();
  var y = '';
  var i=x.length;
  var j=0;
  while (i>0) {
    --i;
    y = x.substr(i, 1) + y;
    if (++j % 3 == 0) {
      if (i) y = ',' + y;
    }
  }
  return y;
}

function fmtDecimalNumber(z) {
  var x = fmtNumber(Math.floor(z));
  var y = Math.floor(10000 * (z - Math.floor(z)) + 0.5)
  return x + '.' + y;
}

function fmtAmount(amt) {
  var x = "";
  if (amt<0) {
    x = "<font color=red>$";
    amt *= -1;
    x += fmtNumber(amt);
    x += "</font>";
  } else {
    if (amt>0) {
      x = "<font color=green>$";
      x += fmtNumber(amt);
      x += "</font>";
    } else {
      x = "0";
    }
  }
  return x;
}

function createForm(trainType, trainAmount) {
  var newform = document.createElement('form');
  newform.style.display = 'inline';
  newform.setAttribute('method', 'post');
  newform.setAttribute('action', 'gym.php');
  var itmp;
  itmp = document.createElement('input');
  itmp.setAttribute('type', 'hidden');
  itmp.setAttribute('name', 'times');
  itmp.setAttribute('value', trainAmount.toString());
  newform.appendChild(itmp);
  itmp = document.createElement('input');
  itmp.setAttribute('type', 'hidden');
  itmp.setAttribute('name', 'gym');
  itmp.setAttribute('value', trainType);
  newform.appendChild(itmp);
  itmp = document.createElement('input');
  itmp.setAttribute('type', 'submit');
  itmp.setAttribute('value', trainAmount.toString());
  newform.appendChild(itmp);
  newform.appendChild(document.createElement('br'));
  return newform;
}
