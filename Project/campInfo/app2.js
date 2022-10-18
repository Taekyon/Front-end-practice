require('events').EventEmitter.defaultMaxListeners = 150;


var puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  var browser = await puppeteer.launch();
  var page = await browser.newPage();
  await page.goto(url);

  let fullXpath = "/html/body/div[1]/div[1]/div/span[2]/div[2]/div/div[1]/div[2]/div/div[3]/div[1]/div[1]/p[8]/a";


  // le chemin est juste, mais ce n'est pas la dernière étape, il faut 'fetch' le contenu derrière cette adresse.
  let idToVerify = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[8]/a'); // BAD SYNTAX
  // console.log(idToVerify);
  // idToVerify.classlist.contains("+41");
  
  //TODO: vérifier si le contenu existe
  // var hasAdresse = elt.classlist.contains("");
  // if ( === 0...) {



  var [el8_] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[8]');
  if (el8_ === undefined)
  {
    // SANS ADRESSE
    var [el0] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[1]');
    var txt0 = await el0.getProperty("textContent");
    var nom = await txt0.jsonValue();

    var adresse = "";

    var [el2] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[2]');
    var txt2 = await el2.getProperty("textContent");
    var ville = await txt2.jsonValue();

    var [el3] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[3]');
    var txt3 = await el3.getProperty("textContent");
    var region = await txt3.jsonValue();

    var [website] = await Promise.all((await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[5]/a')).map(async item => await (await item.getProperty('href')).jsonValue())); 

    var [el4] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[6]/a');
    var txt4 = await el4.getProperty("textContent");
    var email = await txt4.jsonValue();

    var [el5] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[7]/a');
    if (el5 === undefined)
    {
      var telephone = "----";
    }
    else
    {
      var txt5 = await el5.getProperty("textContent");
      var telephone = await txt5.jsonValue();
    }

    var [el6] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[1]');
    var txt6 = await el6.getProperty("textContent");
    var latitude = await txt6.jsonValue();

    var [el7] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[2]');
    var txt7 = await el7.getProperty("textContent");
    var longitude = await txt7.jsonValue();
  }
  else
  {
    // AVEC ADRESSE
    var [el0] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[1]');
    var txt0 = await el0.getProperty("textContent");
    var nom = await txt0.jsonValue();

    // console.log(nom);

    var [el1] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[2]');
    var txt1 = await el1.getProperty("textContent");
    var adresse = await txt1.jsonValue();

    var [el2] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[3]');
    var txt2 = await el2.getProperty("textContent");
    var ville = await txt2.jsonValue();

    var [el3] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[4]');
    var txt3 = await el3.getProperty("textContent");
    var region = await txt3.jsonValue();

    var [website] = await Promise.all((await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[6]/a')).map(async item => await (await item.getProperty('href')).jsonValue())); 

    var [el4] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[7]/a');
    // var txt4a = await el4.$("a");
    // var txt4 = await txt4a.getProperty("textContent");
    var txt4 = await el4.getProperty("textContent");
    var email = await txt4.jsonValue();

    var [el5] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[8]/a');
    if (el5 === undefined)
    {
      var telephone = "----";
    }
    else
    {
      var txt5 = await el5.getProperty("textContent");
      var telephone = await txt5.jsonValue();
    }


    var [el6] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[1]');
    var txt6 = await el6.getProperty("textContent");
    var latitude = await txt6.jsonValue();

    var [el7] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[2]');
    var txt7 = await el7.getProperty("textContent");
    var longitude = await txt7.jsonValue();

  }

  // Latitude
  var indexParentheseOuvrante = latitude.indexOf("(");
  var indexParentheseFermante = latitude.indexOf(")");
  latitude = latitude.substring(indexParentheseOuvrante + 1, indexParentheseFermante);

  // Longitude
  indexParentheseOuvrante = longitude.indexOf("(");
  indexParentheseFermante = longitude.indexOf(")");
  longitude = longitude.substring(indexParentheseOuvrante + 1, indexParentheseFermante);

  var indexVille = ville.indexOf(" ");
  var npa = ville.substring(0, indexVille);
  ville = ville.substring(indexVille + 1);


  // // var page = await browser.newPage();

  // var pageWebsite = await browser.newPage();
  // // await pageWebsite.goto(website);
  // // var [elURL] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[1]');

  // await pageWebsite.setRequestInterception(true);
  // pageWebsite.on('request', request => {
  //   if (request.isNavigationRequest() && request.redirectChain().length)
  //     request.abort();
  //   else
  //     request.continue();
  // });
  // await pageWebsite.goto(website);

  // // console.log(await pageWebsite.content());



  browser.close();

  console.log(JSON.stringify({nom, adresse, npa, ville, region, website, email, telephone, latitude, longitude}), ",");

  // return nom, adresse, ville, region, email, telephone, latitude, longitude;
}
//// console.log(JSON.stringify(), ",");

// MAIN
// console.log(JSON.stringify(nom, adresse, ville, region, email, telephone, latitude, longitude), ",");

const urls = ["https://www.pincamp.ch/fr/campings/alp-safari-camping-glamping","https://www.pincamp.ch/fr/campings/alpencamping","https://www.pincamp.ch/fr/campings/camping-au-grand-bois","https://www.pincamp.ch/fr/campings/bauernhof-camping-wyler","https://www.pincamp.ch/fr/campings/camping-bellerive-le-landeron","https://www.pincamp.ch/fr/campings/bumbach-camping","https://www.pincamp.ch/fr/campings/camp-au","https://www.pincamp.ch/fr/campings/campeggio-al-parco-doro","https://www.pincamp.ch/fr/campings/camping-pool-joghi-e-bubu","https://www.pincamp.ch/fr/campings/camping-aaregg","https://www.pincamp.ch/fr/campings/camping-muehleye","https://www.pincamp.ch/fr/campings/camping-aareschlucht","https://www.pincamp.ch/fr/campings/camping-acquarossa","https://www.pincamp.ch/fr/campings/camping-al-censo","https://www.pincamp.ch/fr/campings/camping-alpenblick-2","https://www.pincamp.ch/fr/campings/camping-alphubel","https://www.pincamp.ch/fr/campings/camping-am-kapellenweg","https://www.pincamp.ch/fr/campings/camping-am-schuetzenweiher","https://www.pincamp.ch/fr/campings/camping-andeer","https://www.pincamp.ch/fr/campings/camping-arina","https://www.pincamp.ch/fr/campings/camping-arnist","https://www.pincamp.ch/fr/campings/camping-petit-praz","https://www.pincamp.ch/fr/campings/camping-arosa","https://www.pincamp.ch/fr/campings/camping-attermenzen","https://www.pincamp.ch/fr/campings/camping-atzmaennig","https://www.pincamp.ch/fr/campings/camping-au-lac ","https://www.pincamp.ch/fr/campings/camping-augenstern","https://www.pincamp.ch/fr/campings/camping-baechli ","https://www.pincamp.ch/fr/campings/camping-bachtalen ","https://www.pincamp.ch/fr/campings/camping-bad-zurzach ","https://www.pincamp.ch/fr/campings/camping-balmweid ","https://www.pincamp.ch/fr/campings/camping-bella-tola","https://www.pincamp.ch/fr/campings/camping-bellerive","https://www.pincamp.ch/fr/campings/camping-bellinzona ","https://www.pincamp.ch/fr/campings/bergblick-ferienheim-und-camping ","https://www.pincamp.ch/fr/campings/camping-bois-du-couvent","https://www.pincamp.ch/fr/campings/camping-boomerang","https://www.pincamp.ch/fr/campings/camping-breithorn ","https://www.pincamp.ch/fr/campings/thermal-camping-brigerbad ","https://www.pincamp.ch/fr/campings/camping-brigga","https://www.pincamp.ch/fr/campings/camping-bucheli","https://www.pincamp.ch/fr/campings/camping-buchenhof ","https://www.pincamp.ch/fr/campings/camping-buosingen ","https://www.pincamp.ch/fr/campings/camping-waldegg ","https://www.pincamp.ch/fr/campings/camping-carrera ","https://www.pincamp.ch/fr/campings/camping-cavresc ","https://www.pincamp.ch/fr/campings/camping-chapella ","https://www.pincamp.ch/fr/campings/camping-communal-de-cudrefin ","https://www.pincamp.ch/fr/campings/camping-cul","https://www.pincamp.ch/fr/campings/camping-de-belfond ","https://www.pincamp.ch/fr/campings/camping-de-chevroux","https://www.pincamp.ch/fr/campings/camp-petit-cortaillod-plage","https://www.pincamp.ch/fr/campings/camping-de-la-foret-sorens","https://www.pincamp.ch/fr/campings/camping-de-la-menthue","https://www.pincamp.ch/fr/campings/camping-de-la-piscine-aigle","https://www.pincamp.ch/fr/campings/camping-la-tene-plage","https://www.pincamp.ch/fr/campings/camping-de-vallorbe","https://www.pincamp.ch/fr/campings/camping-monte-san-giorgio","https://www.pincamp.ch/fr/campings/camping-delta ","https://www.pincamp.ch/fr/campings/camping-des-cases ","https://www.pincamp.ch/fr/campings/camping-les-frassettes","https://www.pincamp.ch/fr/campings/camping-des-glaciers","https://www.pincamp.ch/fr/campings/camp-des-peches","https://www.pincamp.ch/fr/campings/camping-aux-vernes","https://www.pincamp.ch/fr/campings/camping-du-grand-paradis","https://www.pincamp.ch/fr/campings/camping-du-lac-iseltwald","https://www.pincamp.ch/fr/campings/camping-le-rocheray","https://www.pincamp.ch/fr/campings/camping-du-raimeux","https://www.pincamp.ch/fr/campings/camping-du-val-de-travers","https://www.pincamp.ch/fr/campings/camping-eggishorn-zmoosji","https://www.pincamp.ch/fr/campings/camping-eggmatte ","https://www.pincamp.ch/fr/campings/camping-eichholz ","https://www.pincamp.ch/fr/campings/camping-eienwaeldli ","https://www.pincamp.ch/fr/campings/camping-eigernordwand ","https://www.pincamp.ch/fr/campings/camping-erlach ","https://www.pincamp.ch/fr/campings/camping-euthal ","https://www.pincamp.ch/fr/campings/camping-evolene ","https://www.pincamp.ch/fr/campings/camping-ewil ","https://www.pincamp.ch/fr/campings/camping-fankhauser ","https://www.pincamp.ch/fr/campings/camping-fischerhaus ","https://www.pincamp.ch/fr/campings/camping-fischers-fritz ","https://www.pincamp.ch/fr/campings/camping-fraso-ranch ","https://www.pincamp.ch/fr/campings/camping-frick ","https://www.pincamp.ch/fr/campings/camping-gadmen ","https://www.pincamp.ch/fr/campings/camping-garvera ","https://www.pincamp.ch/fr/campings/camping-gaesi ","https://www.pincamp.ch/fr/campings/camping-gemmi-agarn ","https://www.pincamp.ch/fr/campings/camping-geschina ","https://www.pincamp.ch/fr/campings/camping-giessen ","https://www.pincamp.ch/fr/campings/camping-giessenpark ","https://www.pincamp.ch/fr/campings/camping-gletscherdorf ","https://www.pincamp.ch/fr/campings/camping-gottardo ","https://www.pincamp.ch/fr/campings/camping-le-grand-saint-bernard ","https://www.pincamp.ch/fr/campings/camping-grassi ","https://www.pincamp.ch/fr/campings/tcs-camping-lenzerheide ","https://www.pincamp.ch/fr/campings/camping-gravatscha ","https://www.pincamp.ch/fr/campings/camping-grimselblick ","https://www.pincamp.ch/fr/campings/camping-gruene-aff ","https://www.pincamp.ch/fr/campings/camping-grund ","https://www.pincamp.ch/fr/campings/camping-guldifuss ","https://www.pincamp.ch/fr/campings/camping-hasenweide ","https://www.pincamp.ch/fr/campings/camping-haute-gruyere ","https://www.pincamp.ch/fr/campings/heubach-ruschegg ","https://www.pincamp.ch/fr/campings/camping-hobby-unterseen ","https://www.pincamp.ch/fr/campings/camping-hofstatt-derfli ","https://www.pincamp.ch/fr/campings/camping-hopfraeben ","https://www.pincamp.ch/fr/campings/camping-husky-lodge ","https://www.pincamp.ch/fr/campings/camping-huettenberg ","https://www.pincamp.ch/fr/campings/camping-idyll ","https://www.pincamp.ch/fr/campings/camping-international-lido ","https://www.pincamp.ch/fr/campings/camping-international-sarnersee-giswil ","https://www.pincamp.ch/fr/campings/camping-islas ","https://www.pincamp.ch/fr/campings/camping-isola ","https://www.pincamp.ch/fr/campings/camping-jakobsbad ","https://www.pincamp.ch/fr/campings/camping-jaunpass ","https://www.pincamp.ch/fr/campings/camping-julia ","https://www.pincamp.ch/fr/campings/camping-jungfrau-lauterbrunnen ","https://www.pincamp.ch/fr/campings/camping-la-belle-verte","https://www.pincamp.ch/fr/campings/la-cibourg","https://www.pincamp.ch/fr/campings/camping-la-grande-ecluse","https://www.pincamp.ch/fr/campings/plage-et-camping-de-la-maladaire","https://www.pincamp.ch/fr/campings/camping-la-moubra","https://www.pincamp.ch/fr/campings/camping-nouvelle-plage","https://www.pincamp.ch/fr/campings/camping-lac-des-brenets","https://www.pincamp.ch/fr/campings/camping-lago-maggiore","https://www.pincamp.ch/fr/campings/camping-lazy-rancho-unterseen ","https://www.pincamp.ch/fr/campings/camping-le-berceau ","https://www.pincamp.ch/fr/campings/camping-les-grangettes","https://www.pincamp.ch/fr/campings/camping-les-grottes","https://www.pincamp.ch/fr/campings/camping-les-horizons-bleus","https://www.pincamp.ch/fr/campings/camping-les-sapins-epagny-gruyeres","https://www.pincamp.ch/fr/campings/camping-leutswil","https://www.pincamp.ch/fr/campings/camping-lido-mappo ","https://www.pincamp.ch/fr/campings/camping-lilot-bosquet ","https://www.pincamp.ch/fr/campings/camping-lindenhof ","https://www.pincamp.ch/fr/campings/camping-lotschental ","https://www.pincamp.ch/fr/campings/camping-luganolake ","https://www.pincamp.ch/fr/campings/camping-madulain ","https://www.pincamp.ch/fr/campings/camping-plan-curtinac ","https://www.pincamp.ch/fr/campings/camping-manor-farm-bern ","https://www.pincamp.ch/fr/campings/camping-manser ","https://www.pincamp.ch/fr/campings/camping-maurholz ","https://www.pincamp.ch/fr/campings/camping-melezza-tessin ","https://www.pincamp.ch/fr/campings/camping-molignon ","https://www.pincamp.ch/fr/campings/camping-molinazzo ","https://www.pincamp.ch/fr/campings/camping-monte-generoso ","https://www.pincamp.ch/fr/campings/camping-monument ","https://www.pincamp.ch/fr/campings/camping-morteratsch ","https://www.pincamp.ch/fr/campings/camping-muglin ","https://www.pincamp.ch/fr/campings/camping-mulina ","https://www.pincamp.ch/fr/campings/camping-murg-am-see ","https://www.pincamp.ch/fr/campings/camping-oberei-wilderswil ","https://www.pincamp.ch/fr/campings/camping-oberiberg ","https://www.pincamp.ch/fr/campings/camping-obsee ","https://www.pincamp.ch/fr/campings/camping-panorama-aeschi ","https://www.pincamp.ch/fr/campings/camping-paradis-plage ","https://www.pincamp.ch/fr/campings/camping-paradiso-lago ","https://www.pincamp.ch/fr/campings/camping-pe-da-munt ","https://www.pincamp.ch/fr/campings/camping-piantett ","https://www.pincamp.ch/fr/campings/camping-piccolo-paradiso ","https://www.pincamp.ch/fr/campings/camping-avenches-plage ","https://www.pincamp.ch/fr/campings/camping-pradafenz","https://www.pincamp.ch/fr/campings/camping-preles ","https://www.pincamp.ch/fr/campings/camping-rania ","https://www.pincamp.ch/fr/campings/camping-rendez-vous ","https://www.pincamp.ch/fr/campings/camping-reussbruecke-ottenbach","https://www.pincamp.ch/fr/campings/camping-riarena ","https://www.pincamp.ch/fr/campings/camping-rischli ","https://www.pincamp.ch/fr/campings/camping-rivabella-tenero ","https://www.pincamp.ch/fr/campings/camping-rive-bleue ","https://www.pincamp.ch/fr/campings/camping-ruderbaum ","https://www.pincamp.ch/fr/campings/camping-ruetti ","https://www.pincamp.ch/fr/campings/camping-saanen-beim-kappeli ","https://www.pincamp.ch/fr/campings/camping-saignelegier ","https://www.pincamp.ch/fr/campings/camping-saland ","https://www.pincamp.ch/fr/campings/camping-santa-monica ","https://www.pincamp.ch/fr/campings/camping-schaffhausen-freizeitanlage-rheinwiese ","https://www.pincamp.ch/fr/campings/camping-schiffenen ","https://www.pincamp.ch/fr/campings/camping-schoenblick-saas-grund ","https://www.pincamp.ch/fr/campings/camping-seeblick-mosen ","https://www.pincamp.ch/fr/campings/camping-seefeld-park-sarnen ","https://www.pincamp.ch/fr/campings/camping-seegarten ","https://www.pincamp.ch/fr/campings/camping-seehorn ","https://www.pincamp.ch/fr/campings/camping-seeweid-schwarzsee ","https://www.pincamp.ch/fr/campings/camping-sihlwald ","https://www.pincamp.ch/fr/campings/camping-silvaplana ","https://www.pincamp.ch/fr/campings/camping-simplonblick ","https://www.pincamp.ch/fr/campings/camping-auf-dem-sand ","https://www.pincamp.ch/fr/campings/camping-sportarena ","https://www.pincamp.ch/fr/campings/camping-st-cassian ","https://www.pincamp.ch/fr/campings/camping-st-gallen-wittenbach ","https://www.pincamp.ch/fr/campings/camping-st-moritz ","https://www.pincamp.ch/fr/campings/sternen-camping ","https://www.pincamp.ch/fr/campings/camping-strausak ","https://www.pincamp.ch/fr/campings/camping-stuhlegg ","https://www.pincamp.ch/fr/campings/camping-st-ursanne ","https://www.pincamp.ch/fr/campings/campingplatz-sulz ","https://www.pincamp.ch/fr/campings/camping-sur-en ","https://www.pincamp.ch/fr/campings/camping-sursee-waldheim","https://www.pincamp.ch/fr/campings/camping-swiss-plage ","https://www.pincamp.ch/fr/campings/camping-talacker ","https://www.pincamp.ch/fr/campings/camping-tamaro ","https://www.pincamp.ch/fr/campings/centre-de-vacance-tariche ","https://www.pincamp.ch/fr/campings/camping-thoerishaus ","https://www.pincamp.ch/fr/campings/camping-torrent ","https://www.pincamp.ch/fr/campings/camping-tresiana ","https://www.pincamp.ch/fr/campings/camping-trin ","https://www.pincamp.ch/fr/campings/camping-trun ","https://www.pincamp.ch/fr/campings/camping-tuerlersee ","https://www.pincamp.ch/fr/campings/camping-und-schwimmbad-am-rhein-kaiseraugst ","https://www.pincamp.ch/fr/campings/camping-unteraegeri ","https://www.pincamp.ch/fr/campings/camping-valcentre ","https://www.pincamp.ch/fr/campings/camping-vermeille","https://www.pincamp.ch/fr/campings/camping-le-vidy","https://www.pincamp.ch/fr/campings/camping-vieux-pont ","https://www.pincamp.ch/fr/campings/camping-vitznau","https://www.pincamp.ch/fr/campings/camping-viva ","https://www.pincamp.ch/fr/campings/camping-wagenhausen ","https://www.pincamp.ch/fr/campings/camping-waldesruh-wil ","https://www.pincamp.ch/fr/campings/camping-waldhof ","https://www.pincamp.ch/fr/campings/camping-waldhort ","https://www.pincamp.ch/fr/campings/camping-wang ","https://www.pincamp.ch/fr/campings/camping-werdenberg ","https://www.pincamp.ch/fr/campings/camping-wiggerspitz ","https://www.pincamp.ch/fr/campings/camping-wildberg-wildberg ","https://www.pincamp.ch/fr/campings/camping-wydeli ","https://www.pincamp.ch/fr/campings/camping-yverdon-plage","https://www.pincamp.ch/fr/campings/campingplatz-aumuhle ","https://www.pincamp.ch/fr/campings/camping-buchhorn ","https://www.pincamp.ch/fr/campings/campingplatz-heiti ","https://www.pincamp.ch/fr/campings/campingplatz-rausenbach ","https://www.pincamp.ch/fr/campings/campingplatz-thorbach ","https://www.pincamp.ch/fr/campings/campingplatz-strandbad-amriswil ","https://www.pincamp.ch/fr/campings/campingplatz-urmiberg-gmbh ","https://www.pincamp.ch/fr/campings/camping-campofelice","https://www.pincamp.ch/fr/campings/camping-luetschental","https://www.pincamp.ch/fr/campings/davos-munts","https://www.pincamp.ch/fr/campings/erlebnisbauernhof-gerbe","https://www.pincamp.ch/fr/campings/camping-les-cerneux","https://www.pincamp.ch/fr/campings/camping-ferienhof-ruti","https://www.pincamp.ch/fr/campings/frutigresort","https://www.pincamp.ch/fr/campings/geneva-city-camping-bois-de-bay","https://www.pincamp.ch/fr/campings/heliosport-aargau","https://www.pincamp.ch/fr/campings/camping-sutz","https://www.pincamp.ch/fr/campings/camping-eischen","https://www.pincamp.ch/fr/campings/camping-jungfrau-unterseen","https://www.pincamp.ch/fr/campings/jura-bivouac","https://www.pincamp.ch/fr/campings/kandersteg-international-scout-centre","https://www.pincamp.ch/fr/campings/la-coue","https://www.pincamp.ch/fr/campings/la-plage","https://www.pincamp.ch/fr/campings/les-cheseaux","https://www.pincamp.ch/fr/campings/caravan-camping-miralago","https://www.pincamp.ch/fr/campings/naturistengelande-die-neue-zeit","https://www.pincamp.ch/fr/campings/panorama-camping-surcuolm","https://www.pincamp.ch/fr/campings/camping-la-sarvaz","https://www.pincamp.ch/fr/campings/remo-camp-moosbad","https://www.pincamp.ch/fr/campings/restaurant-camping-oase","https://www.pincamp.ch/fr/campings/rinerlodge-camping","https://www.pincamp.ch/fr/campings/schuur-zum-hirschpark","https://www.pincamp.ch/fr/campings/see-camping","https://www.pincamp.ch/fr/campings/seeland-camp","https://www.pincamp.ch/fr/campings/camping-bruggerhorn","https://www.pincamp.ch/fr/campings/tcs-camping-bern-eymatt","https://www.pincamp.ch/fr/campings/tcs-camping-buochs-vierwaldstaettersee","https://www.pincamp.ch/fr/campings/tcs-camping-buochs-vierwaldstaettersee","https://www.pincamp.ch/fr/campings/tcs-camping-disentis","https://www.pincamp.ch/fr/campings/tcs-camping-flaach-am-rhein","https://www.pincamp.ch/fr/campings/camping-flims","https://www.pincamp.ch/fr/campings/tcs-camping-fanel","https://www.pincamp.ch/fr/campings/tcs-camping-geneve-vesenaz","https://www.pincamp.ch/fr/campings/tcs-camping-gordevio-maggiatal","https://www.pincamp.ch/fr/campings/tcs-camping-interlaken","https://www.pincamp.ch/fr/campings/camping-la-muree","https://www.pincamp.ch/fr/campings/tcs-camping-lugano-muzzano","https://www.pincamp.ch/fr/campings/tcs-camping-luzern-horw","https://www.pincamp.ch/fr/campings/tcs-camping-martigny","https://www.pincamp.ch/fr/campings/tcs-camping-morges","https://www.pincamp.ch/fr/campings/tcs-camping-orbe","https://www.pincamp.ch/fr/campings/tcs-camping-salavaux-plage","https://www.pincamp.ch/fr/campings/tcs-camping-samedan","https://www.pincamp.ch/fr/campings/tcs-camping-scuol","https://www.pincamp.ch/fr/campings/tcs-camping-sempach","https://www.pincamp.ch/fr/campings/tcs-camping-sion","https://www.pincamp.ch/fr/campings/tcs-camping-solothurn","https://www.pincamp.ch/fr/campings/camping-viamala","https://www.pincamp.ch/fr/campings/tcs-camping-zug","https://www.pincamp.ch/fr/campings/thur-camping-1","https://www.pincamp.ch/fr/campings/tcs-camping-landquart"];

// console.log(process.argv[2]);

function loop(_urls)
{
  for (let url of _urls) {
    scrapeProduct(url);
  }
}

var timeout = 0;

for (i = 0; i < urls.length ; i += 10)
{
  // console.log("aaa");
  setTimeout(function(x) {
    return (function()
    {
      // console.log(x);
      
      loop(urls.slice(x, x + 10));
    });
  }(i), timeout);
  
  timeout += 15000;
}


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

run();

async function run() {
  await delay(10000000);
}


// for (let url of urls) {
//   scrapeProduct(url);
// }

// A COLLER: url source
// sans adresse : https://www.pincamp.ch/fr/campings/thermal-camping-brigerbad

/* DOC
await: permet d'attendre que la fonction s'éxecute.
$x: sélecteur puppeteer pour le 'xpath'.
*/

  // xpath to jquery
  // let jq_sel = xpath
  //   .substr(1) // ERROR: signature dépréciée.
  //   .replace(/\//g, " > ")
  //   .replace(/\[(\d+)\]/g, ($0, i) => ":nth-child(" + i + ")");
  // console.log(jq_sel); // got the name right, but it's not quiet the result, we need to get the content behind this xpath first.