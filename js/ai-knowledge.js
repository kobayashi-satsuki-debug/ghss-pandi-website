/* =========================================================
   Study material for the AI buddy — classes 1 to 12 and
   Plus One / Plus Two Commerce. Every entry carries an
   English and a Malayalam answer; Kannada falls back to
   English through AI.pickText.
   ========================================================= */
window.AI_KNOWLEDGE = [
  /* ---------- science ---------- */
  {
    keys: ['photosynthesis', 'പ്രകാശസംശ്ലേഷണ', 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣ', 'chlorophyll', 'plant food', 'ഹരിതകണ'],
    subject: 'science',
    en: 'Photosynthesis is how green plants make food.\n\n1. Roots take water, leaves take carbon dioxide.\n2. Chlorophyll in the leaf traps sunlight.\n3. Water and carbon dioxide join to form glucose, and oxygen is released.\n\nEquation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in sunlight, with chlorophyll).\n\nExam tip: draw the leaf cross-section and label stomata, mesophyll and vein — that diagram alone often carries two marks.',
    ml: 'പ്രകാശസംശ്ലേഷണം എന്നത് പച്ചച്ചെടികൾ ഭക്ഷണം ഉണ്ടാക്കുന്ന രീതിയാണ്.\n\n1. വേരുകൾ വെള്ളം എടുക്കുന്നു, ഇലകൾ കാർബൺ ഡൈ ഓക്സൈഡ് എടുക്കുന്നു.\n2. ഇലയിലെ ക്ലോറോഫിൽ സൂര്യപ്രകാശം പിടിച്ചെടുക്കുന്നു.\n3. വെള്ളവും കാർബൺ ഡൈ ഓക്സൈഡും ചേർന്ന് ഗ്ലൂക്കോസ് ഉണ്ടാകുന്നു, ഓക്സിജൻ പുറത്തുവരുന്നു.\n\nസമവാക്യം: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.\n\nപരീക്ഷാ നുറുങ്ങ്: ഇലയുടെ ഛേദചിത്രം വരച്ച് സ്റ്റോമാറ്റ, മീസോഫിൽ, സിര എന്നിവ അടയാളപ്പെടുത്തുക — ഈ ചിത്രത്തിന് തന്നെ രണ്ട് മാർക്ക് കിട്ടാം.'
  },
  {
    keys: ['respiration', 'ശ്വസനം', 'ಉಸಿರಾಟ', 'breathing', 'lungs', 'ശ്വാസകോശ'],
    subject: 'science',
    en: 'Respiration releases the energy stored in food.\n\n• Aerobic (with oxygen): glucose + oxygen → carbon dioxide + water + energy. This happens in the mitochondria.\n• Anaerobic (without oxygen): in muscles it makes lactic acid, which causes cramp; in yeast it makes alcohol and carbon dioxide.\n• Breathing is only the movement of air; respiration is the chemical release of energy inside cells.\n\nExam tip: a question asking "why do we breathe faster while running" wants both parts — more oxygen in, and faster removal of carbon dioxide.',
    ml: 'ശ്വസനം ഭക്ഷണത്തിലെ ഊർജ്ജം പുറത്തെടുക്കുന്ന പ്രക്രിയയാണ്.\n\n• ഓക്സിജനോടെ (എറോബിക്): ഗ്ലൂക്കോസ് + ഓക്സിജൻ → കാർബൺ ഡൈ ഓക്സൈഡ് + വെള്ളം + ഊർജ്ജം. മൈറ്റോകോൺഡ്രിയയിൽ നടക്കുന്നു.\n• ഓക്സിജൻ ഇല്ലാതെ (അനെറോബിക്): പേശികളിൽ ലാക്ടിക് ആസിഡ് ഉണ്ടാകുന്നു — ഇതാണ് പേശിവേദനയ്ക്ക് കാരണം; യീസ്റ്റിൽ ആൽക്കഹോളും കാർബൺ ഡൈ ഓക്സൈഡും ഉണ്ടാകുന്നു.\n• ശ്വസിക്കൽ വായുവിന്റെ ചലനം മാത്രം; ശ്വസനം കോശങ്ങൾക്കുള്ളിൽ ഊർജ്ജം പുറത്തെടുക്കുന്ന രാസപ്രവർത്തനമാണ്.\n\nപരീക്ഷാ നുറുങ്ങ്: ഓടുമ്പോൾ ശ്വാസം വേഗത്തിലാകുന്നത് എന്തുകൊണ്ട് എന്ന ചോദ്യത്തിന് രണ്ട് ഭാഗവും വേണം — കൂടുതൽ ഓക്സിജൻ അകത്തേക്ക്, കാർബൺ ഡൈ ഓക്സൈഡ് വേഗം പുറത്തേക്ക്.'
  },
  {
    keys: ['digestion', 'ദഹന', 'ಜೀರ್ಣ', 'stomach', 'ആമാശയ', 'digestive'],
    subject: 'science',
    en: 'The digestive path, in order:\n\nMouth → oesophagus → stomach → small intestine → large intestine → rectum.\n\n• Mouth: teeth grind, saliva has amylase that starts starch digestion.\n• Stomach: hydrochloric acid and pepsin begin protein digestion.\n• Small intestine: bile from the liver breaks fat into droplets; pancreatic and intestinal juices finish the work; villi absorb nutrients into blood.\n• Large intestine: water is absorbed; the rest leaves as waste.\n\nExam tip: label the diagram left to right and write one function beside each organ — that is usually the full answer.',
    ml: 'ദഹനപഥം ക്രമത്തിൽ:\n\nവായ → അന്നനാളം → ആമാശയം → ചെറുകുടൽ → വൻകുടൽ → മലദ്വാരം.\n\n• വായ: പല്ലുകൾ അരയ്ക്കുന്നു; ഉമിനീരിലെ അമിലേസ് അന്നജത്തിന്റെ ദഹനം തുടങ്ങുന്നു.\n• ആമാശയം: ഹൈഡ്രോക്ലോറിക് ആസിഡും പെപ്സിനും പ്രോട്ടീന്റെ ദഹനം തുടങ്ങുന്നു.\n• ചെറുകുടൽ: കരളിലെ പിത്തം കൊഴുപ്പിനെ ചെറുതുള്ളികളാക്കുന്നു; പാൻക്രിയാസ്, കുടൽ രസങ്ങൾ ദഹനം പൂർത്തിയാക്കുന്നു; വില്ലൈ രക്തത്തിലേക്ക് പോഷകങ്ങൾ എടുക്കുന്നു.\n• വൻകുടൽ: വെള്ളം ആഗിരണം ചെയ്യുന്നു; ബാക്കി മാലിന്യമായി പുറത്തുപോകുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: ചിത്രത്തിൽ ഓരോ അവയവത്തിനും ഒരു ധർമ്മം എഴുതുക — അതാണ് പൂർണ ഉത്തരം.'
  },
  {
    keys: ['cell', 'കോശം', 'ಜೀವಕೋಶ', 'nucleus', 'membrane', 'mitochondria'],
    subject: 'science',
    en: 'A cell is the smallest living unit.\n\n• Cell membrane: controls what enters and leaves.\n• Cytoplasm: where most reactions happen.\n• Nucleus: holds DNA and controls the cell.\n• Mitochondria: release energy from food (the "power house").\n• Plant cells also have a cell wall, chloroplasts and a large vacuole; animal cells do not.\n\nExam tip: a table of "plant cell vs animal cell" with three differences is a very common two-mark question — learn it as a table, not as prose.',
    ml: 'കോശം ഏറ്റവും ചെറിയ ജീവനുള്ള ഘടകമാണ്.\n\n• കോശസ്തരം: അകത്തേക്കും പുറത്തേക്കും പോകുന്നത് നിയന്ത്രിക്കുന്നു.\n• സൈറ്റോപ്ലാസം: കൂടുതൽ പ്രവർത്തനങ്ങൾ നടക്കുന്ന ഭാഗം.\n• ന്യൂക്ലിയസ്: DNA സൂക്ഷിക്കുന്നു, കോശത്തെ നിയന്ത്രിക്കുന്നു.\n• മൈറ്റോകോൺഡ്രിയ: ഭക്ഷണത്തിൽ നിന്ന് ഊർജ്ജം പുറത്തെടുക്കുന്നു ("പവർ ഹൗസ്").\n• സസ്യകോശത്തിൽ കോശഭിത്തി, ക്ലോറോപ്ലാസ്റ്റ്, വലിയ വാക്യൂൾ എന്നിവയുണ്ട്; ജന്തുകോശത്തിൽ ഇല്ല.\n\nപരീക്ഷാ നുറുങ്ങ്: "സസ്യകോശം vs ജന്തുകോശം" മൂന്ന് വ്യത്യാസങ്ങളുള്ള പട്ടിക — ഇത് സാധാരണ ചോദ്യമാണ്; ഖണ്ഡികയായി പഠിക്കാതെ പട്ടികയായി പഠിക്കുക.'
  },
  {
    keys: ['periodic table', 'ആവർത്തന പട്ടിക', 'ಆವರ್ತ ಕೋಷ್ಟಕ', 'metal', 'non-metal', 'ലോഹം'],
    subject: 'science',
    en: 'The periodic table arranges elements by atomic number.\n\n• Groups (vertical) share the number of outer electrons, so they behave alike: Group 1 alkali metals, Group 17 halogens, Group 18 noble gases.\n• Periods (horizontal) show the shells being filled.\n• Metals: shiny, malleable, conduct heat and electricity, form positive ions. Non-metals: brittle, poor conductors, form negative ions.\n• Across a period, metallic character decreases; down a group it increases.\n\nExam tip: learn the first 20 elements with symbols — most questions in this chapter assume them.',
    ml: 'ആവർത്തന പട്ടിക മൂലകങ്ങളെ ആറ്റോമിക നമ്പർ അനുസരിച്ച് ക്രമീകരിക്കുന്നു.\n\n• ഗ്രൂപ്പുകൾ (നിരകൾ): പുറം ഇലക്ട്രോണുകളുടെ എണ്ണം ഒന്നാണ്, അതിനാൽ സ്വഭാവവും ഒന്ന് — ഗ്രൂപ്പ് 1 ആൽക്കലി ലോഹങ്ങൾ, ഗ്രൂപ്പ് 17 ഹാലോജനുകൾ, ഗ്രൂപ്പ് 18 ഉൽകൃഷ്ട വാതകങ്ങൾ.\n• പീരിയഡുകൾ (വരികൾ): ഷെല്ലുകൾ നിറയുന്നത് കാണിക്കുന്നു.\n• ലോഹങ്ങൾ: തിളക്കം, വലിച്ചുനീട്ടാം, താപവും വൈദ്യുതിയും കടത്തിവിടും, പോസിറ്റീവ് അയോണുകൾ ഉണ്ടാക്കും. അലോഹങ്ങൾ: പൊട്ടുന്നത്, കടത്തിവിടില്ല, നെഗറ്റീവ് അയോണുകൾ.\n• ഒരു പീരിയഡിൽ ലോഹസ്വഭാവം കുറയുന്നു; ഒരു ഗ്രൂപ്പിൽ താഴേക്ക് കൂടുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: ആദ്യ 20 മൂലകങ്ങളുടെ ചിഹ്നങ്ങൾ പഠിക്കുക — ഈ അധ്യായത്തിലെ മിക്ക ചോദ്യങ്ങൾക്കും അവ അറിയണം.'
  },
  {
    keys: ['acid', 'base', 'ആസിഡ്', 'ക്ഷാര', 'ಆಮ್ಲ', 'ph', 'litmus', 'salt'],
    subject: 'science',
    en: 'Acids, bases and salts:\n\n• Acid: sour, turns blue litmus red, pH below 7 (HCl, H₂SO₄, vinegar).\n• Base: soapy, turns red litmus blue, pH above 7 (NaOH, lime water).\n• Neutralisation: acid + base → salt + water. Example: HCl + NaOH → NaCl + H₂O.\n• pH scale 0–14: 7 neutral; each step is ten times stronger.\n• Uses: sulphuric acid in batteries, sodium bicarbonate in antacids, common salt in food preservation.\n\nExam tip: write the balanced equation for every neutralisation question — the equation itself carries marks.',
    ml: 'ആസിഡ്, ക്ഷാരം, ലവണം:\n\n• ആസിഡ്: പുളി, നീല ലിറ്റ്മസ് ചുവപ്പാക്കും, pH 7ൽ താഴെ (HCl, H₂SO₄, വിനാഗിരി).\n• ക്ഷാരം: സോപ്പ് പോലെ, ചുവപ്പ് ലിറ്റ്മസ് നീലയാക്കും, pH 7ൽ മുകളിൽ (NaOH, കുമ്മായവെള്ളം).\n• നിർവീര്യീകരണം: ആസിഡ് + ക്ഷാരം → ലവണം + വെള്ളം. ഉദാ: HCl + NaOH → NaCl + H₂O.\n• pH സ്കെയിൽ 0–14: 7 നിർവീര്യം; ഓരോ ഘട്ടവും പത്തിരട്ടി ശക്തി.\n• ഉപയോഗങ്ങൾ: ബാറ്ററിയിൽ സൾഫ്യൂരിക് ആസിഡ്, ആന്റാസിഡിൽ സോഡിയം ബൈകാർബണേറ്റ്, ഭക്ഷണം സൂക്ഷിക്കാൻ ഉപ്പ്.\n\nപരീക്ഷാ നുറുങ്ങ്: ഓരോ നിർവീര്യീകരണ ചോദ്യത്തിനും സന്തുലിത സമവാക്യം എഴുതുക — സമവാക്യത്തിന് തന്നെ മാർക്കുണ്ട്.'
  },
  {
    keys: ['chemical reaction', 'രാസപ്രവർത്തന', 'ರಾಸಾಯನಿಕ ಕ್ರಿಯೆ', 'balanced equation', 'combustion', 'oxidation'],
    subject: 'science',
    en: 'Chemical reactions and equations:\n\n• A balanced equation has the same number of each atom on both sides — never change a formula to balance, only the coefficient.\n• Combination: A + B → AB. Decomposition: AB → A + B. Displacement: A + BC → AC + B. Double displacement: AB + CD → AD + CB.\n• Oxidation is loss of electrons or gain of oxygen; reduction is the reverse. Both together is a redox reaction.\n• Exothermic gives out heat (burning); endothermic takes heat in (photosynthesis).\n\nTry balancing this and tell me the coefficients: Fe + O₂ → Fe₂O₃.',
    ml: 'രാസപ്രവർത്തനങ്ങളും സമവാക്യങ്ങളും:\n\n• സന്തുലിത സമവാക്യത്തിൽ ഇരുവശത്തും ഓരോ മൂലകത്തിന്റെയും ആറ്റങ്ങളുടെ എണ്ണം തുല്യമായിരിക്കണം — ഫോർമുല മാറ്റരുത്, ഗുണാങ്കം മാത്രം മാറ്റുക.\n• സംയോജനം: A + B → AB. വിഘടനം: AB → A + B. സ്ഥാനച്യുതി: A + BC → AC + B. ഇരട്ട സ്ഥാനച്യുതി: AB + CD → AD + CB.\n• ഓക്സീകരണം: ഇലക്ട്രോൺ നഷ്ടം അല്ലെങ്കിൽ ഓക്സിജൻ സ്വീകരണം; നിരോക്സീകരണം വിപരീതം. രണ്ടും ചേർന്നത് റിഡോക്സ് പ്രവർത്തനം.\n• എക്സോതെർമിക് താപം പുറത്തുവിടും (കത്തൽ); എൻഡോതെർമിക് താപം എടുക്കും (പ്രകാശസംശ്ലേഷണം).\n\nഇത് സന്തുലിതമാക്കി ഗുണാങ്കങ്ങൾ പറയൂ: Fe + O₂ → Fe₂O₃.'
  },
  {
    keys: ['light', 'reflection', 'refraction', 'പ്രതിഫലനം', 'അപവർത്തനം', 'ಬೆಳಕು', 'lens', 'mirror'],
    subject: 'science',
    en: 'Light — reflection and refraction:\n\n• Reflection: angle of incidence = angle of reflection, measured from the normal. Plane mirrors form a virtual, upright image of the same size.\n• Concave mirrors converge light (used in torches, dentists); convex mirrors spread it (used as rear-view mirrors).\n• Refraction: light bends when it changes medium because its speed changes. Going into a denser medium it bends towards the normal.\n• Lens formula: 1/f = 1/v − 1/u; power P = 1/f (dioptre).\n\nExam tip: always draw the normal as a dashed line and label the angles — examiners give marks for the diagram.',
    ml: 'പ്രകാശം — പ്രതിഫലനവും അപവർത്തനവും:\n\n• പ്രതിഫലനം: പതനകോൺ = പ്രതിഫലനകോൺ, ലംബരേഖയിൽ നിന്ന് അളക്കുന്നു. സമതല ദർപ്പണം അതേ വലിപ്പത്തിലുള്ള മിഥ്യാ പ്രതിബിംബം ഉണ്ടാക്കുന്നു.\n• കോൺകേവ് ദർപ്പണം പ്രകാശം ഒരുമിപ്പിക്കുന്നു (ടോർച്ച്, ഡെന്റിസ്റ്റ്); കോൺവെക്സ് ദർപ്പണം വിതറുന്നു (വാഹനത്തിലെ കണ്ണാടി).\n• അപവർത്തനം: മാധ്യമം മാറുമ്പോൾ വേഗം മാറുന്നതിനാൽ പ്രകാശം വളയുന്നു. സാന്ദ്രത കൂടിയ മാധ്യമത്തിലേക്ക് പോകുമ്പോൾ ലംബരേഖയോട് അടുക്കുന്നു.\n• ലെൻസ് സൂത്രവാക്യം: 1/f = 1/v − 1/u; പവർ P = 1/f (ഡയോപ്റ്റർ).\n\nപരീക്ഷാ നുറുങ്ങ്: ലംബരേഖ ഇടവിട്ട വരയായി വരച്ച് കോണുകൾ അടയാളപ്പെടുത്തുക — ചിത്രത്തിന് മാർക്കുണ്ട്.'
  },
  {
    keys: ['sound', 'ശബ്ദം', 'ಶಬ್ದ', 'frequency', 'echo', 'pitch'],
    subject: 'science',
    en: 'Sound is a longitudinal wave that needs a medium.\n\n• It travels fastest in solids, slower in liquids, slowest in gases — and not at all in vacuum.\n• Frequency decides pitch; amplitude decides loudness; the unit is hertz (Hz).\n• Audible range for humans: 20 Hz to 20,000 Hz. Above that is ultrasound (used in scanning and SONAR).\n• Echo is reflected sound; the minimum distance for a clear echo is about 17 m.\n\nExam tip: "why we cannot hear on the moon" needs one line — there is no air, so no medium for the wave.',
    ml: 'ശബ്ദം ഒരു മാധ്യമം ആവശ്യമുള്ള അനുദൈർഘ്യ തരംഗമാണ്.\n\n• ഖരത്തിൽ വേഗം, ദ്രാവകത്തിൽ കുറവ്, വാതകത്തിൽ ഏറ്റവും കുറവ് — ശൂന്യതയിൽ പ്രവർത്തിക്കില്ല.\n• ആവൃത്തി ശബ്ദത്തിന്റെ ഉയരം (pitch) തീരുമാനിക്കുന്നു; ആംപ്ലിറ്റ്യൂഡ് ഉച്ചത; യൂണിറ്റ് ഹെർട്സ് (Hz).\n• മനുഷ്യന്റെ കേൾവി പരിധി: 20 Hz മുതൽ 20,000 Hz വരെ. അതിന് മുകളിൽ അൾട്രാസൗണ്ട് (സ്കാനിംഗ്, SONAR).\n• പ്രതിധ്വനി പ്രതിഫലിച്ച ശബ്ദമാണ്; വ്യക്തമായ പ്രതിധ്വനിക്ക് കുറഞ്ഞത് 17 മീറ്റർ ദൂരം വേണം.\n\nപരീക്ഷാ നുറുങ്ങ്: "ചന്ദ്രനിൽ ശബ്ദം കേൾക്കാനാകാത്തത് എന്തുകൊണ്ട്" എന്നതിന് ഒരു വരി മതി — വായു ഇല്ല, അതായത് തരംഗത്തിന് മാധ്യമമില്ല.'
  },
  {
    keys: ['heat', 'താപം', 'ಉಷ್ಣ', 'temperature', 'conduction', 'convection'],
    subject: 'science',
    en: 'Heat travels in three ways:\n\n• Conduction: through solids, particle to particle, without the particles moving along (a metal spoon in hot tea).\n• Convection: in liquids and gases, the hot part rises and the cool part sinks (sea breeze, boiling water).\n• Radiation: no medium needed, travels as infrared (the Sun reaching us, a heater warming a room).\n\n• Temperature is measured in °C, K; heat is energy, measured in joules.\n• Specific heat capacity: water is high, so coastal places stay cooler in the day.\n\nExam tip: for "why does a metal tap feel colder than a wooden door", the answer is conduction — not that the metal is actually colder.',
    ml: 'താപം മൂന്ന് രീതിയിൽ സഞ്ചരിക്കുന്നു:\n\n• ചാലനം (conduction): ഖരങ്ങളിൽ, കണങ്ങൾ നീങ്ങാതെ കണ്ണിയിൽ നിന്ന് കണ്ണിയിലേക്ക് (ചായയിലെ ലോഹ സ്പൂൺ).\n• സംവഹനം (convection): ദ്രാവകങ്ങളിലും വാതകങ്ങളിലും, ചൂടുള്ള ഭാഗം മുകളിലേക്ക് പോകുന്നു (കടൽക്കാറ്റ്, തിളയ്ക്കുന്ന വെള്ളം).\n• വികിരണം (radiation): മാധ്യമം വേണ്ട, ഇൻഫ്രാറെഡ് ആയി സഞ്ചരിക്കുന്നു (സൂര്യൻ, ഹീറ്റർ).\n\n• താപനില °C, K എന്നിവയിൽ; താപം ഊർജ്ജമാണ്, ജൂളിൽ.\n• ജലത്തിന് ഉയർന്ന വിശിഷ്ട താപധാരിത ഉള്ളതിനാൽ തീരപ്രദേശങ്ങൾ പകൽ തണുത്തിരിക്കും.\n\nപരീക്ഷാ നുറുങ്ങ്: "ലോഹ ടാപ്പ് മരക്കതക്കാൽ തണുത്ത് തോന്നുന്നത് എന്തുകൊണ്ട്" — ഉത്തരം ചാലനമാണ്; ലോഹം യഥാർത്ഥത്തിൽ തണുപ്പുള്ളതല്ല.'
  },
  {
    keys: ['magnet', 'magnetism', 'കാന്തിക', 'ಕಾಂತ', 'solenoid', 'electromagnet'],
    subject: 'science',
    en: 'Magnetism and electromagnets:\n\n• A magnet has two poles; like poles repel, unlike poles attract. Field lines run from north to south outside the magnet.\n• A current-carrying wire has a magnetic field around it (right-hand thumb rule).\n• A coil with a soft-iron core is an electromagnet — its strength grows with more turns, more current, or a core.\n• Electric bell, loudspeaker, motor and generator all use this link between electricity and magnetism.\n\nExam tip: draw field lines as closed curves that never cross, with arrows.',
    ml: 'കാന്തികതയും വൈദ്യുത കാന്തങ്ങളും:\n\n• കാന്തത്തിന് രണ്ട് ധ്രുവങ്ങൾ; സമാന ധ്രുവങ്ങൾ വികർഷിക്കും, വിപരീത ധ്രുവങ്ങൾ ആകർഷിക്കും. കാന്തത്തിന് പുറത്ത് ഫീൽഡ് രേഖകൾ ഉത്തരത്തിൽ നിന്ന് ദക്ഷിണത്തിലേക്ക്.\n• കറന്റ് ഒഴുകുന്ന കമ്പിയുടെ ചുറ്റും കാന്തികഫീൽഡ് ഉണ്ട് (വലംകൈ നിയമം).\n• മൃദു ഇരുമ്പ് കാമ്പുള്ള ചുരുളാണ് വൈദ്യുത കാന്തം — ചുറ്റുകൾ, കറന്റ്, കാമ്പ് കൂടിയാൽ ശക്തി കൂടും.\n• ഇലക്ട്രിക് ബെൽ, സ്പീക്കർ, മോട്ടോർ, ജനറേറ്റർ — എല്ലാം വൈദ്യുതിയുടെയും കാന്തികതയുടെയും ബന്ധം ഉപയോഗിക്കുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: ഫീൽഡ് രേഖകൾ ഒരിക്കലും ഛേദിക്കാത്ത അടച്ച വളവുകളായി അമ്പടയാളത്തോടെ വരയ്ക്കുക.'
  },
  {
    keys: ['motion', 'law of motion', 'newton', 'ചലന', 'ಬಲ', 'force', 'momentum'],
    subject: 'science',
    en: 'Newton\u2019s laws:\n\n1. An object stays at rest or in uniform motion unless a force acts on it (inertia).\n2. F = m × a. Example: 10 N on 2 kg gives 5 m/s².\n3. Every action has an equal and opposite reaction (a rocket pushes gas down, the gas pushes the rocket up).\n\n• Momentum p = m × v; force is the rate of change of momentum.\n• Uniform circular motion needs a centripetal force towards the centre.\n\nExam tip: in numericals, write "given, formula, substitution, answer with unit" — each line earns a mark.',
    ml: 'ന്യൂട്ടന്റെ നിയമങ്ങൾ:\n\n1. ഒരു വസ്തു നിശ്ചലമായോ സമചലനത്തിലോ ഇരിക്കും, ബലം പ്രവർത്തിക്കുന്നില്ലെങ്കിൽ (ജഡത്വം).\n2. F = m × a. ഉദാ: 2 കി.ഗ്രാമിൽ 10 N → 5 m/s².\n3. ഓരോ പ്രവർത്തനത്തിനും തുല്യവും വിപരീതവുമായ പ്രതിപ്രവർത്തനം (റോക്കറ്റ് വാതകം താഴേക്ക് തള്ളുന്നു, വാതകം റോക്കറ്റിനെ മുകളിലേക്ക് തള്ളുന്നു).\n\n• മൊമെന്റം p = m × v; ബലം മൊമെന്റത്തിന്റെ മാറ്റനിരക്ക്.\n• ഏകീകൃത വൃത്തചലനത്തിന് കേന്ദ്രത്തിലേക്കുള്ള അഭികേന്ദ്രബലം വേണം.\n\nപരീക്ഷാ നുറുങ്ങ്: സംഖ്യാപ്രശ്നങ്ങളിൽ "തന്നിരിക്കുന്നത്, സൂത്രവാക്യം, മൂല്യനിർദ്ദേശം, യൂണിറ്റോടെ ഉത്തരം" — ഓരോ വരിക്കും മാർക്ക്.'
  },
  {
    keys: ['gravitation', 'ഗുരുത്വ', 'ಗುರುತ್ವ', 'weight', 'mass', 'free fall'],
    subject: 'science',
    en: 'Gravitation:\n\n• Every mass attracts every other mass: F = G m₁m₂ / d².\n• G = 6.67 × 10⁻¹¹ N m²/kg² — it is universal, the same everywhere.\n• g on Earth ≈ 9.8 m/s²; weight W = m × g is a force (newtons), mass is not.\n• Your mass stays the same on the Moon, your weight becomes about one-sixth.\n• Free fall: only gravity acts; air resistance is ignored in the standard sums.\n\nExam tip: never write "weight in kg" — weight is in newtons. That single slip loses a mark every year.',
    ml: 'ഗുരുത്വാകർഷണം:\n\n• ഓരോ പിണ്ഡവും മറ്റുള്ളവയെ ആകർഷിക്കുന്നു: F = G m₁m₂ / d².\n• G = 6.67 × 10⁻¹¹ N m²/kg² — ഇത് സാർവത്രികമാണ്.\n• ഭൂമിയിൽ g ≈ 9.8 m/s²; ഭാരം W = m × g ഒരു ബലമാണ് (ന്യൂട്ടൺ), പിണ്ഡമല്ല.\n• ചന്ദ്രനിൽ പിണ്ഡം അതേപോലെ, ഭാരം ഏകദേശം ആറിലൊന്ന്.\n• സ്വതന്ത്ര പതനത്തിൽ ഗുരുത്വം മാത്രം പ്രവർത്തിക്കുന്നു; വായുവിന്റെ പ്രതിരോധം കണക്കിലെടുക്കില്ല.\n\nപരീക്ഷാ നുറുങ്ങ്: "ഭാരം കി.ഗ്രാമിൽ" എന്ന് ഒരിക്കലും എഴുതരുത് — ഭാരം ന്യൂട്ടണിൽ. ഈ ഒരു തെറ്റിന് എല്ലാ വർഷവും മാർക്ക് നഷ്ടപ്പെടുന്നു.'
  },
  {
    keys: ['electricity', 'ohm', 'ഓം', 'ಓಮ್', 'current', 'voltage', 'resistance', 'circuit'],
    subject: 'science',
    en: 'Electricity:\n\n• Ohm\u2019s law: V = I × R. Doubling voltage doubles current if R is fixed.\n• Example: 12 V across 4 Ω gives I = 3 A.\n• Power P = V × I = I²R; energy = power × time (kWh on a bill).\n• Series: same current, resistances add. Parallel: same voltage, 1/R = 1/R₁ + 1/R₂.\n• Household wiring is parallel so each appliance gets full voltage and can switch off alone.\n\nExam tip: state the formula, substitute with units, then answer with the unit — marks are given at each step.',
    ml: 'വൈദ്യുതി:\n\n• ഓമിന്റെ നിയമം: V = I × R. R മാറ്റമില്ലാതെ വോൾട്ടേജ് ഇരട്ടിയായാൽ കറന്റും ഇരട്ടി.\n• ഉദാഹരണം: 4 Ωൽ 12 V → I = 3 A.\n• പവർ P = V × I = I²R; ഊർജ്ജം = പവർ × സമയം (ബില്ലിൽ kWh).\n• ശ്രേണി: കറന്റ് ഒന്ന്, പ്രതിരോധങ്ങൾ കൂടും. സമാന്തരം: വോൾട്ടേജ് ഒന്ന്, 1/R = 1/R₁ + 1/R₂.\n• വീട്ടിലെ വയറിംഗ് സമാന്തരമാണ് — ഓരോ ഉപകരണത്തിനും പൂർണ വോൾട്ടേജ് കിട്ടും, വേർതിരിച്ച് ഓഫ് ചെയ്യാം.\n\nപരീക്ഷാ നുറുങ്ങ്: സൂത്രവാക്യം, യൂണിറ്റോടെ മൂല്യം, യൂണിറ്റോടെ ഉത്തരം — ഓരോ ഘട്ടത്തിനും മാർക്ക്.'
  },
  {
    keys: ['carbon', 'കാർബൺ', 'ಕಾರ್ಬನ್', 'hydrocarbon', 'ethanol', 'soap'],
    subject: 'science',
    en: 'Carbon compounds:\n\n• Carbon forms four bonds, so it makes chains and rings — that is why there are millions of organic compounds.\n• Alkanes (single bonds) CₙH₂ₙ₊₂; alkenes (one double bond) CₙH₂ₙ; alkynes (one triple bond) CₙH₂ₙ₋₂.\n• Ethanol C₂H₅OH is made by fermentation; it is used in sanitizers and as fuel.\n• Ethanoic acid (vinegar) is a weak acid; soap is a salt of a fatty acid and works by forming micelles around grease.\n\nExam tip: learn the first four alkanes with formulas — methane, ethane, propane, butane appear in almost every paper.',
    ml: 'കാർബൺ സംയുക്തങ്ങൾ:\n\n• കാർബണിന് നാല് ബന്ധനങ്ങൾ — അതിനാൽ ചങ്ങലകളും വളയങ്ങളും ഉണ്ടാക്കാം; ലക്ഷക്കണക്കിന് ഓർഗാനിക് സംയുക്തങ്ങൾ ഉള്ളതിന്റെ കാരണം ഇതാണ്.\n• ആൽക്കെയ്നുകൾ (ഏക ബന്ധനം) CₙH₂ₙ₊₂; ആൽക്കീനുകൾ (ഒരു ഇരട്ട ബന്ധനം) CₙH₂ₙ; ആൽക്കൈനുകൾ (ഒരു ത്രിക ബന്ധനം) CₙH₂ₙ₋₂.\n• എത്തനോൾ C₂H₅OH പുളിപ്പിച്ച് ഉണ്ടാക്കുന്നു; സാനിറ്റൈസറിലും ഇന്ധനമായും ഉപയോഗം.\n• എത്തനോയിക് ആസിഡ് (വിനാഗിരി) ദുർബല ആസിഡ്; സോപ്പ് കൊഴുപ്പ് ആസിഡിന്റെ ലവണമാണ്, മൈസെല്ലുകൾ ഉണ്ടാക്കി അഴുക്ക് നീക്കുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: ആദ്യ നാല് ആൽക്കെയ്നുകളുടെ ഫോർമുല പഠിക്കുക — മീഥെയ്ൻ, ഈഥെയ്ൻ, പ്രൊപ്പെയ്ൻ, ബ്യൂട്ടെയ്ൻ.'
  },
  {
    keys: ['heredity', 'പാരമ്പര്യ', 'ಅನುವಂಶಿಕ', 'gene', 'dna', 'evolution'],
    subject: 'science',
    en: 'Heredity:\n\n• Genes are sections of DNA on chromosomes and carry traits from parents to children.\n• Each parent gives one allele per gene. A dominant allele shows even with one copy; a recessive one needs two.\n• Genotype is the gene pair (TT, Tt, tt); phenotype is what you see.\n• In a cross Tt × Tt the offspring are 1 TT : 2 Tt : 1 tt, so 3 tall : 1 short.\n• Sex in humans: XX female, XY male; the father decides the sex of the child.\n\nExam tip: draw the Punnett square every time — it earns the diagram mark and prevents mistakes.',
    ml: 'പാരമ്പര്യം:\n\n• ജീനുകൾ ക്രോമസോമുകളിലെ DNA ഭാഗങ്ങളാണ്; മാതാപിതാക്കളിൽ നിന്ന് സ്വഭാവങ്ങൾ കൈമാറ്റം ചെയ്യുന്നു.\n• ഓരോ ജീനിനും ഓരോ മാതാപിതാവിൽ നിന്ന് ഒരു അലീൽ വീതം ലഭിക്കും. പ്രബല അലീൽ ഒന്ന് മതി; ദുർബലത്തിന് രണ്ട് വേണം.\n• ജനോടൈപ്പ് ജീൻ ജോടി (TT, Tt, tt); ഫിനോടൈപ്പ് കാണുന്ന സ്വഭാവം.\n• Tt × Tt ൽ സന്തതികൾ 1 TT : 2 Tt : 1 tt → 3 ഉയരം : 1 കുറവ്.\n• മനുഷ്യരിൽ XX പെൺ, XY ആൺ; കുട്ടിയുടെ ലിംഗം പിതാവ് തീരുമാനിക്കുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: എല്ലായ്പ്പോഴും പണ്ണെറ്റ് ചതുരം വരയ്ക്കുക — ഡയഗ്രത്തിന് മാർക്ക് കിട്ടും, തെറ്റും ഒഴിവാകും.'
  },
  {
    keys: ['ecosystem', 'പരിസ്ഥിതി', 'ಪರಿಸರ', 'food chain', 'biodiversity', 'pollution'],
    subject: 'science',
    en: 'Ecosystem and environment:\n\n• Food chain: producer → primary consumer → secondary consumer → decomposer. Arrows show the flow of energy.\n• Only about 10% of energy passes to the next level (10% law), so food chains are short.\n• Biodiversity means the variety of living things; Kerala\u2019s Western Ghats is a global hotspot.\n• Pollution: air (vehicles, burning waste), water (sewage, plastic), soil (pesticides). Reduce, reuse, recycle, refuse.\n\nExam tip: a question on "why are food chains limited to four or five links" wants the 10% energy loss — say it clearly.',
    ml: 'ആവാസവ്യവസ്ഥയും പരിസ്ഥിതിയും:\n\n• ഭക്ഷ്യശൃംഖല: ഉത്പാദകൻ → പ്രാഥമിക ഉപഭോക്താവ് → ദ്വിതീയ ഉപഭോക്താവ് → വിഘടകൻ. അമ്പടയാളം ഊർജ്ജപ്രവാഹം കാണിക്കുന്നു.\n• അടുത്ത തലത്തിലേക്ക് ഏകദേശം 10% ഊർജ്ജം മാത്രം (10% നിയമം), അതിനാൽ ശൃംഖലകൾ ചെറുതാണ്.\n• ജൈവവൈവിധ്യം എന്നത് ജീവജാലങ്ങളുടെ വൈവിധ്യം; കേരളത്തിലെ പശ്ചിമഘട്ടം ആഗോള ഹോട്ട്സ്പോട്ടാണ്.\n• മലിനീകരണം: വായു (വാഹനങ്ങൾ, കത്തിക്കൽ), വെള്ളം (മലിനജലം, പ്ലാസ്റ്റിക്), മണ്ണ് (കീടനാശിനികൾ). കുറയ്ക്കുക, പുനരുപയോഗിക്കുക, റീസൈക്കിൾ ചെയ്യുക, വേണ്ടെന്ന് പറയുക.\n\nപരീക്ഷാ നുറുങ്ങ്: "ഭക്ഷ്യശൃംഖല നാലോ അഞ്ചോ കണ്ണികളിൽ മാത്രം എന്തുകൊണ്ട്" — ഉത്തരം 10% ഊർജ്ജനഷ്ടം; വ്യക്തമായി എഴുതുക.'
  },
  {
    keys: ['life process', 'ജീവപ്രക്രിയ', 'ಜೀವ ಪ್ರಕ್ರಿಯೆ', 'nutrition', 'excretion', 'transportation'],
    subject: 'science',
    en: 'Life processes in one page:\n\n• Nutrition: autotrophic (plants make food) vs heterotrophic (animals take it in).\n• Respiration: glucose is broken down to release energy (see the respiration card).\n• Transportation: in humans the heart pumps blood through arteries, veins and capillaries; in plants xylem carries water up and phloem carries food.\n• Excretion: kidneys filter blood into urine; plants lose water by transpiration.\n• Control: the nervous system sends fast electrical signals; hormones are slower chemical signals.\n\nExam tip: for "difference between xylem and phloem", write two rows — direction, and what is carried.',
    ml: 'ജീവപ്രക്രിയകൾ ഒറ്റ പേജിൽ:\n\n• പോഷണം: സ്വയം പോഷകൻ (സസ്യങ്ങൾ ഭക്ഷണം ഉണ്ടാക്കുന്നു), പരപോഷകൻ (ജന്തുക്കൾ എടുക്കുന്നു).\n• ശ്വസനം: ഗ്ലൂക്കോസ് വിഘടിച്ച് ഊർജ്ജം പുറത്തെടുക്കുന്നു.\n• സംവഹനം: മനുഷ്യരിൽ ഹൃദയം ധമനികൾ, സിരകൾ, കേശികകൾ വഴി രക്തം പമ്പ് ചെയ്യുന്നു; സസ്യങ്ങളിൽ സൈലം വെള്ളം മുകളിലേക്ക്, ഫ്ലോയം ഭക്ഷണം.\n• വിസർജ്ജനം: വൃക്കകൾ രക്തം ശുദ്ധീകരിച്ച് മൂത്രം ഉണ്ടാക്കുന്നു; സസ്യങ്ങൾ ബാഷ്പോത്സർജ്ജനത്തിലൂടെ വെള്ളം പുറത്തുവിടുന്നു.\n• നിയന്ത്രണം: നാഡീവ്യവസ്ഥ വേഗത്തിലുള്ള വൈദ്യുത സന്ദേശങ്ങൾ; ഹോർമോണുകൾ പതുക്കെയുള്ള രാസ സന്ദേശങ്ങൾ.\n\nപരീക്ഷാ നുറുങ്ങ്: "സൈലവും ഫ്ലോയവും തമ്മിലുള്ള വ്യത്യാസം" — ദിശയും കൊണ്ടുപോകുന്ന വസ്തുവും രണ്ട് വരികളിൽ എഴുതുക.'
  },
  {
    keys: ['fraction', 'ഭിന്നസംഖ്യ', 'ಭಿನ್ನರಾಶಿ', 'decimal', 'ദശാംശ', 'numerator'],
    subject: 'maths',
    en: 'Fractions and decimals:\n\n• Add or subtract only when the denominators match: 1/2 + 1/3 → 3/6 + 2/6 = 5/6.\n• Multiply straight across: 2/3 × 3/4 = 1/2. For division, flip the second fraction: 2/3 ÷ 4/5 = 5/6.\n• Decimal to fraction: 0.75 = 75/100 = 3/4.\n• Compare by cross-multiplying: 2/3 and 3/5 → 10 vs 9, so 2/3 is bigger.\n\nTry this and tell me the answer: 3/4 + 5/6.',
    ml: 'ഭിന്നസംഖ്യകളും ദശാംശങ്ങളും:\n\n• ഛേദങ്ങൾ ഒന്നാകുമ്പോൾ മാത്രം കൂട്ടുകയോ കുറയ്ക്കുകയോ ചെയ്യുക: 1/2 + 1/3 → 3/6 + 2/6 = 5/6.\n• ഗുണനം നേരെ: 2/3 × 3/4 = 1/2. ഹരണത്തിൽ രണ്ടാമത്തേത് മറിച്ചിടുക: 2/3 ÷ 4/5 = 5/6.\n• ദശാംശത്തിൽ നിന്ന് ഭിന്നസംഖ്യ: 0.75 = 75/100 = 3/4.\n• താരതമ്യം: 2/3, 3/5 → 10 vs 9, അതിനാൽ 2/3 വലുത്.\n\nഇത് ചെയ്ത് ഉത്തരം പറയൂ: 3/4 + 5/6.'
  },
  {
    keys: ["lcm", "hcf", "ലസാഗു", "ഉസാഘ", "total factors", "prime"],
    subject: "maths",
    en: "LCM and HCF:\n\n• HCF is the biggest number that divides both; LCM is the smallest number both divide into.\n• Prime factorisation: 12 = 2² × 3, 18 = 2 × 3² → HCF = 6, LCM = 36.\n• Shortcut for two numbers: HCF × LCM = product of the numbers.\n• Word problems: \"greatest number that divides\" → HCF; \"smallest number divisible by both\" → LCM; bells ringing together → LCM.\n\nExam tip: write the prime factorisation in a column — both answers then appear in one step.",
    ml: "ലസാഗു, ഉസാഘ:\n\n• ഉസാഘ രണ്ടിനെയും ഹരിക്കുന്ന ഏറ്റവും വലിയ സംഖ്യ; ലസാഗു രണ്ടും ഹരിക്കുന്ന ഏറ്റവും ചെറിയ സംഖ്യ.\n• അഭാജ്യ ഘടകങ്ങൾ: 12 = 2² × 3, 18 = 2 × 3² → ഉസാഘ = 6, ലസാഗു = 36.\n• രണ്ട് സംഖ്യകൾക്ക്: ഉസാഘ × ലസാഗു = സംഖ്യകളുടെ ഗുണനഫലം.\n• പ്രശ്നങ്ങൾ: \"ഹരിക്കുന്ന ഏറ്റവും വലിയ സംഖ്യ\" → ഉസാഘ; \"രണ്ടും ഹരിക്കുന്ന ഏറ്റവും ചെറിയ സംഖ്യ\" → ലസാഗു; മണികൾ ഒരുമിച്ച് അടിക്കുന്നത് → ലസാഗു.\n\nപരീക്ഷാ നുറുങ്ങ്: അഭാജ്യ ഘടകങ്ങൾ ഒരു നിരയിൽ എഴുതുക."
  },
  {
    keys: ["percentage", "ശതമാനം", "profit", "loss", "ലാഭം", "discount"],
    subject: "maths",
    en: "Percentage, profit and loss:\n\n• x% of N = (x/100) × N. Up 20% → × 1.2; down 20% → × 0.8.\n• Profit = SP − CP; profit% is always on CP: (profit / CP) × 100.\n• Loss% = (CP − SP) / CP × 100.\n• Discount is on the marked price, not on the cost price.\n• Example: CP 500, SP 575 → profit 75 → 15%.\n\nWatch this trap: a 20% rise then a 20% fall does not return to the start (1.2 × 0.8 = 0.96, a 4% loss).",
    ml: "ശതമാനം, ലാഭവും നഷ്ടവും:\n\n• N ന്റെ x% = (x/100) × N. 20% വർദ്ധന → 1.2 കൊണ്ട് ഗുണിക്കുക; 20% കുറവ് → 0.8.\n• ലാഭം = SP − CP; ലാഭശതമാനം എപ്പോഴും CP യിൽ: (ലാഭം / CP) × 100.\n• നഷ്ടശതമാനം = (CP − SP) / CP × 100.\n• കിഴിവ് അടയാളപ്പെടുത്തിയ വിലയിൽ, വാങ്ങിയ വിലയിൽ അല്ല.\n• ഉദാ: CP 500, SP 575 → ലാഭം 75 → 15%.\n\nശ്രദ്ധിക്കുക: 20% കൂടി പിന്നെ 20% കുറഞ്ഞാൽ ആദ്യ വിലയിൽ തിരിച്ചെത്തില്ല (1.2 × 0.8 = 0.96, 4% നഷ്ടം)."
  },
  {
    keys: ["ratio", "അനുപാതം", "proportion", "average", "mean"],
    subject: "maths",
    en: "Ratio, proportion and averages:\n\n• Ratio 3:5 means for every 3 of the first there are 5 of the second.\n• To share an amount, add the parts: ₹800 in 3:5 → 8 parts → 1 part = ₹100 → ₹300 and ₹500.\n• Proportion: a/b = c/d → ad = bc.\n• Mean = sum ÷ count. Add a value → new mean = (old sum + new value) ÷ (n + 1).\n\nExam tip: in age or mixture sums, write \"now\" and \"after x years\" as separate rows before forming the equation.",
    ml: "അനുപാതം, അനുപാതബന്ധം, ശരാശരി:\n\n• 3:5 എന്നാൽ ആദ്യത്തേതിന്റെ 3 ഉണ്ടാകുമ്പോൾ രണ്ടാമത്തേതിന്റെ 5.\n• തുക അനുപാതത്തിൽ വിഭജിക്കാൻ ഭാഗങ്ങൾ കൂട്ടുക: ₹800, 3:5 → 8 ഭാഗം → ഒരു ഭാഗം ₹100 → ₹300, ₹500.\n• അനുപാതബന്ധം: a/b = c/d → ad = bc.\n• ശരാശരി = തുക ÷ എണ്ണം. പുതിയ മൂല്യം ചേർത്താൽ ശരാശരി = (പഴയ തുക + പുതിയത്) ÷ (n + 1).\n\nപരീക്ഷാ നുറുങ്ങ്: പ്രായമോ മിശ്രിതമോ ഉള്ള കണക്കിൽ \"ഇപ്പോൾ\", \"x വർഷം കഴിഞ്ഞ്\" വെവ്വേറെ എഴുതുക."
  },
  {
    keys: ["interest", "പലിശ", "compound", "simple interest", "gst"],
    subject: "maths",
    en: "Interest and GST:\n\n• Simple interest: SI = (P × R × T) / 100.\n• Compound interest: A = P(1 + R/100)ⁿ, CI = A − P. ₹10,000 at 10% for 2 years → A = 12,100, CI = ₹2,100.\n• Simple interest is equal every year; compound interest grows because interest also earns interest.\n• GST is on the selling price: ₹1,000 + 18% = ₹1,180. To remove GST from a final price, divide by 1.18.\n\nExam tip: write P, R, T at the top before substituting — most lost marks here come from swapped values.",
    ml: "പലിശയും ജി.എസ്.ടിയും:\n\n• സാധാരണ പലിശ: SI = (P × R × T) / 100.\n• കൂട്ടുപലിശ: A = P(1 + R/100)ⁿ, CI = A − P. ₹10,000, 10%, 2 വർഷം: A = 12,100, CI = ₹2,100.\n• സാധാരണ പലിശ എല്ലാ വർഷവും ഒരുപോലെ; കൂട്ടുപലിശ പലിശയ്ക്കും പലിശ കിട്ടുന്നതിനാൽ കൂടും.\n• ജി.എസ്.ടി വിലയുടെ മേൽ: ₹1,000 + 18% → ₹1,180. അവസാന വിലയിൽ നിന്ന് കളയാൻ 1.18 കൊണ്ട് ഹരിക്കുക.\n\nപരീക്ഷാ നുറുങ്ങ്: P, R, T മുകളിൽ എഴുതി ശേഷം മൂല്യങ്ങൾ ചേർക്കുക."
  },
  {
    keys: ["area", "perimeter", "വിസ്തീർണ്ണം", "ചുറ്റളവ്", "triangle", "circle", "rectangle"],
    subject: "maths",
    en: "Area and perimeter:\n\n• Rectangle: area l × b, perimeter 2(l + b). Square: a² and 4a.\n• Triangle: ½ × base × height; with three sides use Heron's formula.\n• Circle: area πr², circumference 2πr. Semicircle: ½πr², perimeter πr + 2r.\n• Parallelogram: base × height. Trapezium: ½ × (sum of parallel sides) × height. Rhombus: ½ × d1 × d2.\n\nExam tip: write the answer in square units for area — a missing \"cm²\" costs a mark.",
    ml: "വിസ്തീർണ്ണവും ചുറ്റളവും:\n\n• ചതുരം: l × b, 2(l + b). സമചതുരം: a², 4a.\n• ത്രികോണം: ½ × പാദം × ഉയരം; മൂന്ന് വശങ്ങൾ അറിയാമെങ്കിൽ ഹെറോണിന്റെ സൂത്രവാക്യം.\n• വൃത്തം: πr², 2πr. അർദ്ധവൃത്തം: ½πr², πr + 2r.\n• സമാന്തരികം: പാദം × ഉയരം. ലംബകം: ½ × (സമാന്തര വശങ്ങളുടെ തുക) × ഉയരം. സമചതുർഭുജം: ½ × d1 × d2.\n\nപരീക്ഷാ നുറുങ്ങ്: വിസ്തീർണ്ണത്തിന് ചതുരശ്ര യൂണിറ്റ് എഴുതണം."
  },
  {
    keys: ["volume", "surface area", "ഘനഫലം", "ഉപരിതല", "cylinder", "cone", "sphere"],
    subject: "maths",
    en: "Surface area and volume:\n\n• Cube: a³, total surface 6a².\n• Cuboid: lbh, 2(lb + bh + hl).\n• Cylinder: πr²h, curved 2πrh, total 2πr(r + h).\n• Cone: ⅓πr²h, curved πrl with l = √(r² + h²).\n• Sphere: 4/3 πr³, 4πr². Hemisphere: ⅔πr³, 3πr².\n\nExam tip: formula, substitution, simplification — the formula line carries a mark on its own.",
    ml: "ഉപരിതല വിസ്തീർണ്ണവും ഘനഫലവും:\n\n• സമഘനം: a³, 6a².\n• ചതുരഘനം: lbh, 2(lb + bh + hl).\n• സിലിണ്ടർ: πr²h, 2πrh, 2πr(r + h).\n• കോൺ: ⅓πr²h, πrl, l = √(r² + h²).\n• ഗോളം: 4/3 πr³, 4πr². അർദ്ധഗോളം: ⅔πr³, 3πr².\n\nപരീക്ഷാ നുറുങ്ങ്: സൂത്രവാക്യം, മൂല്യം, ലഘൂകരണം — സൂത്രവാക്യ വരിക്ക് മാർക്കുണ്ട്."
  },
  {
    keys: ["trigonometry", "ത്രികോണമിതി", "sin", "cos", "tan", "pythagoras", "angle of elevation"],
    subject: "maths",
    en: "Trigonometry basics:\n\n• Right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.\n• Values: sin 30 = ½, cos 30 = √3/2, tan 30 = 1/√3; sin 45 = cos 45 = 1/√2, tan 45 = 1; sin 60 = √3/2, cos 60 = ½, tan 60 = √3.\n• sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ.\n• Pythagoras: a² + b² = c² in a right triangle.\n• Angle of elevation is measured upward from the horizontal; depression downward.\n\nExam tip: draw the triangle and mark the angle before choosing a ratio.",
    ml: "ത്രികോണമിതിയുടെ അടിസ്ഥാനം:\n\n• മട്ടത്രികോണത്തിൽ: sin θ = എതിർവശം/കർണം, cos θ = സമീപവശം/കർണം, tan θ = എതിർ/സമീപം.\n• മൂല്യങ്ങൾ: sin 30 = ½, cos 30 = √3/2, tan 30 = 1/√3; sin 45 = cos 45 = 1/√2, tan 45 = 1; sin 60 = √3/2, cos 60 = ½, tan 60 = √3.\n• sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ.\n• പൈതഗോറസ്: a² + b² = c².\n• ഉന്നതകോൺ മുകളിലേക്ക്, അവനതകോൺ താഴേക്ക്.\n\nപരീക്ഷാ നുറുങ്ങ്: അനുപാതം തിരഞ്ഞെടുക്കും മുൻപ് ത്രികോണം വരച്ച് കോൺ അടയാളപ്പെടുത്തുക."
  },
  {
    keys: ["sequence", "arithmetic sequence", "സമാന്തര ശ്രേണി", "ap", "sum of terms"],
    subject: "maths",
    en: "Arithmetic sequences (AP):\n\n• Terms a, a + d, a + 2d, … with common difference d.\n• nth term: an = a + (n − 1)d.\n• Sum: Sn = n/2 [2a + (n − 1)d] or n/2 (first + last).\n• Example: 3, 7, 11, … a = 3, d = 4 → 10th term 39; sum of 10 terms = 210.\n\nTry this: find the 15th term of 5, 8, 11, … and tell me what you get.",
    ml: "സമാന്തര ശ്രേണി:\n\n• പദങ്ങൾ a, a + d, a + 2d, … d = പൊതുവ്യത്യാസം.\n• n-ാം പദം: an = a + (n − 1)d.\n• തുക: Sn = n/2 [2a + (n − 1)d] അല്ലെങ്കിൽ n/2 (ആദ്യം + അവസാനം).\n• ഉദാ: 3, 7, 11, … → 10-ാം പദം 39; 10 പദങ്ങളുടെ തുക 210.\n\nഇത് ചെയ്യൂ: 5, 8, 11, … ശ്രേണിയുടെ 15-ാം പദം?"
  },
  {
    keys: ["linear equation", "simultaneous", "സമവാക്യം", "two variables", "graph"],
    subject: "maths",
    en: "Linear equations:\n\n• One variable: 3x + 5 = 20 → 3x = 15 → x = 5.\n• Two variables need two equations. From x + y = 10 and x − y = 2, add → 2x = 12 → x = 6, y = 4.\n• One solution if the lines meet, none if parallel, infinitely many if they are the same line.\n• Always verify by substituting both values back.\n\nExam tip: number the equations (1), (2) and write what you add or multiply — examiners follow the working.",
    ml: "രേഖീയ സമവാക്യങ്ങൾ:\n\n• ഒരു ചരം: 3x + 5 = 20 → 3x = 15 → x = 5.\n• രണ്ട് ചരങ്ങൾക്ക് രണ്ട് സമവാക്യം. x + y = 10, x − y = 2 → കൂട്ടുമ്പോൾ 2x = 12 → x = 6, y = 4.\n• രേഖകൾ ഛേദിക്കുന്നുവെങ്കിൽ ഒരു പരിഹാരം; സമാന്തരമെങ്കിൽ ഇല്ല; ഒരേ രേഖയെങ്കിൽ അനന്തം.\n• മൂല്യങ്ങൾ തിരികെ ചേർത്ത് പരിശോധിക്കുക.\n\nപരീക്ഷാ നുറുങ്ങ്: സമവാക്യങ്ങൾ (1), (2) എന്ന് അക്കമിടുക."
  },
  {
    keys: ["kerala history", "കേരള ചരിത്രം", "kerala", "travancore", "kochi", "muziris"],
    subject: "social",
    en: "Kerala history in five points:\n\n• Ancient period: Chera kingdom and trade with Rome and Arabia through Muziris; Buddhism and Jainism flourished early.\n• Medieval: the Zamorin of Calicut and the Kochi and Travancore kingdoms; Vasco da Gama reached Kappad in 1498.\n• Resistance: Pazhassi Raja, Velu Thampi Dalawa and Kunjali Marakkar fought the British and the Portuguese.\n• 19th–20th century: social reform through Sree Narayana Guru, Chattampi Swamikal and Ayyankali; the Vaikom Satyagraha (1924–25).\n• 1956: Kerala was formed by joining Travancore–Kochi and Malabar, with Thiruvananthapuram as capital.\n\nExam tip: dates alone rarely earn full marks — write the event and its result.",
    ml: "കേരള ചരിത്രം അഞ്ച് പോയിന്റിൽ:\n\n• പ്രാചീന കാലം: ചേര രാജവംശം, മുസിരിസ് വഴി റോമുമായും അറേബ്യയുമായും വ്യാപാരം.\n• മധ്യകാലം: സാമൂതിരി, കൊച്ചി, തിരുവിതാംകൂർ രാജവംശങ്ങൾ; 1498ൽ കപ്പാടിൽ വാസ്കോ ഡ ഗാമ.\n• പ്രതിരോധം: പഴശ്ശിരാജ, വേലുത്തമ്പി ദളവ, കുഞ്ഞാലി മരക്കാർ.\n• 19–20 നൂറ്റാണ്ട്: ശ്രീനാരായണ ഗുരു, ചട്ടമ്പിസ്വാമികൾ, അയ്യങ്കാളി, വൈക്കം സത്യാഗ്രഹം (1924–25).\n• 1956: തിരുവിതാംകൂർ–കൊച്ചി, മലബാർ ചേർന്ന് കേരളം; തലസ്ഥാനം തിരുവനന്തപുരം.\n\nപരീക്ഷാ നുറുങ്ങ്: തീയതി മാത്രം മതിയാകില്ല — സംഭവവും അതിന്റെ ഫലവും എഴുതുക."
  },
  {
    keys: ["freedom struggle", "സ്വാതന്ത്ര്യ സമരം", "gandhi", "quit india", "dandi march"],
    subject: "social",
    en: "Indian freedom struggle — the milestones:\n\n• 1857: First War of Independence.\n• 1885: Indian National Congress founded.\n• 1919: Jallianwala Bagh and the Rowlatt Act protests.\n• 1920–22: Non-Cooperation Movement, withdrawn after Chauri Chaura.\n• 1930: Dandi March and Civil Disobedience.\n• 1942: Quit India Movement.\n• 1947: Independence and Partition.\n\nExam tip: for each movement write three things — year, leader, and why it ended. That structure answers almost every question.",
    ml: "ഇന്ത്യൻ സ്വാതന്ത്ര്യ സമരത്തിലെ നാഴികക്കല്ലുകൾ:\n\n• 1857: ഒന്നാം സ്വാതന്ത്ര്യ സമരം.\n• 1885: ഇന്ത്യൻ നാഷണൽ കോൺഗ്രസ് സ്ഥാപിതം.\n• 1919: ജലിയൻവാലാബാഗ്, റൗലറ്റ് ആക്ട് പ്രതിഷേധം.\n• 1920–22: സഹകരണമില്ലാ പ്രസ്ഥാനം, ചൗരി ചൗരയെ തുടർന്ന് പിൻവലിച്ചു.\n• 1930: ദണ്ഡി മാർച്ച്, നിയമലംഘന പ്രസ്ഥാനം.\n• 1942: ക്വിറ്റ് ഇന്ത്യ.\n• 1947: സ്വാതന്ത്ര്യവും വിഭജനവും.\n\nപരീക്ഷാ നുറുങ്ങ്: ഓരോ പ്രസ്ഥാനത്തിനും വർഷം, നേതാവ്, അവസാനിച്ചതിന്റെ കാരണം എഴുതുക."
  },
  {
    keys: ["constitution", "ഭരണഘടന", "fundamental rights", "democracy", "parliament"],
    subject: "social",
    en: "The Indian Constitution:\n\n• Adopted on 26 November 1949 and came into force on 26 January 1950; Dr B. R. Ambedkar chaired the drafting committee.\n• Fundamental Rights (Part III) cover equality, freedom, against exploitation, religion, culture and education, and constitutional remedies.\n• Fundamental Duties (Part IVA) were added by the 42nd Amendment in 1976.\n• Directive Principles (Part IV) guide the government but are not enforceable in court.\n• Democracy means rule by the people through elections, with an independent judiciary.\n\nExam tip: distinguish rights (enforceable) from directive principles (goals) — that comparison is a favourite question.",
    ml: "ഇന്ത്യൻ ഭരണഘടന:\n\n• 1949 നവംബർ 26ന് അംഗീകരിച്ചു, 1950 ജനുവരി 26ന് പ്രാബല്യത്തിൽ; ഡോ. ബി. ആർ. അംബേദ്കർ കരട് സമിതി അധ്യക്ഷൻ.\n• മൗലികാവകാശങ്ങൾ (ഭാഗം III): സമത്വം, സ്വാതന്ത്ര്യം, ചൂഷണത്തിനെതിരെ, മതം, സംസ്കാരം-വിദ്യാഭ്യാസം, ഭരണഘടനാ പരിഹാരങ്ങൾ.\n• മൗലിക കർത്തവ്യങ്ങൾ (ഭാഗം IVA) 1976ലെ 42-ാം ഭേദഗതിയിലൂടെ.\n• നിർദ്ദേശക തത്വങ്ങൾ (ഭാഗം IV) സർക്കാരിന് മാർഗനിർദ്ദേശം, കോടതിയിൽ നിർബന്ധിക്കാനാവില്ല.\n• ജനാധിപത്യം ജനങ്ങൾ തിരഞ്ഞെടുപ്പിലൂടെ ഭരിക്കുന്നു, സ്വതന്ത്ര ജുഡീഷ്യറി.\n\nപരീക്ഷാ നുറുങ്ങ്: അവകാശങ്ങളും നിർദ്ദേശക തത്വങ്ങളും തമ്മിലുള്ള വ്യത്യാസം പഠിക്കുക."
  },
  {
    keys: ["monsoon", "മൺസൂൺ", "climate", "geography", "ഭൂമിശാസ്ത്രം", "rainfall"],
    subject: "social",
    en: "Geography of Kerala and India:\n\n• Kerala lies between the Arabian Sea and the Western Ghats, so it gets heavy rain from the south-west monsoon (June–September) and the north-east monsoon (October–November).\n• The Ghats force the moist wind up: it cools, condenses and rains — this is orographic rainfall.\n• Kerala rivers are short and fast and west-flowing, so few are navigable.\n• India has a monsoon-type climate; the Tropic of Cancer passes through its middle.\n\nExam tip: for \"why does Kerala get rain in June\", name the wind, its direction, the mountain barrier and the type of rainfall.",
    ml: "കേരളത്തിന്റെയും ഇന്ത്യയുടെയും ഭൂമിശാസ്ത്രം:\n\n• കേരളം അറബിക്കടലിനും പശ്ചിമഘട്ടത്തിനും ഇടയിലായതിനാൽ കാലവർഷം (ജൂൺ–സെപ്റ്റംബർ), തുലാവർഷം (ഒക്ടോബർ–നവംബർ) ലഭിക്കുന്നു.\n• ഈർപ്പമുള്ള കാറ്റ് ഘട്ടത്തിൽ മുകളിലേക്ക് തള്ളപ്പെട്ട് തണുത്ത് ഘനീഭവിച്ച് മഴ — പർവ്വതീയ മഴ.\n• കേരളത്തിലെ നദികൾ ചെറുതും വേഗമേറിയതും പടിഞ്ഞാറോട്ട് ഒഴുകുന്നതുമാണ്; ജലഗതാഗതം കുറവ്.\n• ഇന്ത്യയുടെ കാലാവസ്ഥ മൺസൂൺ തരം; കർക്കടകരേഖ മധ്യത്തിലൂടെ കടക്കുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: \"ജൂണിൽ കേരളത്തിൽ മഴ എന്തുകൊണ്ട്\" എന്നതിന് കാറ്റ്, ദിശ, പർവ്വതതടസ്സം, മഴയുടെ തരം എന്നിവ എഴുതുക."
  },
  {
    keys: ["panchayat", "പഞ്ചായത്ത്", "local government", "municipality", "decentralisation"],
    subject: "social",
    en: "Local government in Kerala:\n\n• Three tiers: grama panchayat (village), block panchayat, district panchayat — plus municipalities and corporations in towns.\n• Members are elected for five years; the panchayat president heads the village body.\n• Kerala People's Plan Campaign (1996) gave local bodies real funds and responsibilities — a model studied across India.\n• Local bodies handle water, roads, street lights, sanitation, local health and support to primary education.\n\nExam tip: a question on decentralisation wants the words \"people's participation\" plus one example such as the ward sabha.",
    ml: "കേരളത്തിലെ തദ്ദേശഭരണം:\n\n• മൂന്ന് തലങ്ങൾ: ഗ്രാമപഞ്ചായത്ത്, ബ്ലോക്ക് പഞ്ചായത്ത്, ജില്ലാ പഞ്ചായത്ത് — നഗരങ്ങളിൽ മുനിസിപ്പാലിറ്റിയും കോർപ്പറേഷനും.\n• അംഗങ്ങൾ അഞ്ച് വർഷത്തേക്ക് തിരഞ്ഞെടുക്കുന്നു; പ്രസിഡന്റ് ഗ്രാമസഭയുടെ തലവൻ.\n• 1996ലെ ജനകീയാസൂത്രണ പ്രസ്ഥാനം തദ്ദേശസ്ഥാപനങ്ങൾക്ക് ഫണ്ടും ചുമതലയും നൽകി.\n• വെള്ളം, റോഡ്, തെരുവുവിളക്ക്, ശുചിത്വം, പ്രാഥമിക ആരോഗ്യം, പ്രാഥമിക വിദ്യാഭ്യാസ പിന്തുണ.\n\nപരീക്ഷാ നുറുങ്ങ്: വികേന്ദ്രീകരണ ചോദ്യത്തിന് ജനപങ്കാളിത്തം എന്ന വാക്കും വാർഡ് സഭ പോലെ ഒരു ഉദാഹരണവും ചേർക്കുക."
  },
  {
    keys: ["malayalam", "മലയാളം", "ഉപന്യാസം", "സന്ധി", "സമാസം"],
    subject: "malayalam",
    en: "Writing Malayalam answers well:\n\n• Read the question twice and underline the instruction: വിശദീകരിക്കുക (explain), സമർത്ഥിക്കുക (justify), താരതമ്യം ചെയ്യുക (compare) — each wants a different shape of answer.\n• For a poem question, give the lines, then the meaning, then the feeling (ഭാവം).\n• Sandhi joins two words into one; samasa is a compound — identify the type from the meaning, not the spelling.\n• Keep one idea per paragraph and quote at least one line from the text.\n\nExam tip: write in your own words — copied lines rarely get full marks.",
    ml: "മലയാളം ഉത്തരം എഴുതാനുള്ള രീതി:\n\n• ചോദ്യം രണ്ടുവട്ടം വായിച്ച് നിർദ്ദേശം അടിവരയിടുക: വിശദീകരിക്കുക, സമർത്ഥിക്കുക, താരതമ്യം ചെയ്യുക — ഓരോന്നിനും വ്യത്യസ്ത ഉത്തര രൂപമാണ്.\n• കവിതാ ചോദ്യത്തിന് വരികൾ, അർത്ഥം, ഭാവം എന്ന ക്രമത്തിൽ എഴുതുക.\n• സന്ധി രണ്ട് പദങ്ങളെ ഒന്നാക്കുന്നു; സമാസം സംയുക്ത പദമാണ് — അർത്ഥത്തിൽ നിന്ന് തരം തിരിച്ചറിയുക.\n• ഒരു ഖണ്ഡികയിൽ ഒരു ആശയം; പാഠത്തിൽ നിന്ന് ഒരു വരിയെങ്കിലും ഉദ്ധരിക്കുക.\n\nപരീക്ഷാ നുറുങ്ങ്: സ്വന്തം വാക്കുകളിൽ എഴുതുക — പകർത്തിയ വരികൾക്ക് പൂർണ മാർക്ക് കിട്ടില്ല."
  },
  {
    keys: ["tense", "കാലം", "past tense", "present perfect", "grammar"],
    subject: "english",
    en: "English tenses:\n\n• Present simple: I study every day. (habit)\n• Present continuous: I am studying now. (happening now)\n• Present perfect: I have finished my homework. (past action, present result)\n• Past simple: I studied yesterday. (finished time)\n• Past continuous: I was studying at 8 pm.\n• Future: I will study tomorrow.\n\nExam tip: look for the time word first — yesterday, now, since, already tells you the tense before you read the rest.",
    ml: "ഇംഗ്ലീഷ് കാലങ്ങൾ:\n\n• Present simple: I study every day. (ശീലം)\n• Present continuous: I am studying now. (ഇപ്പോൾ നടക്കുന്നു)\n• Present perfect: I have finished my homework. (കഴിഞ്ഞത്, ഫലം ഇപ്പോൾ)\n• Past simple: I studied yesterday.\n• Past continuous: I was studying at 8 pm.\n• Future: I will study tomorrow.\n\nപരീക്ഷാ നുറുങ്ങ്: ആദ്യം സമയവാക്ക് നോക്കുക — yesterday, now, since, already കാലം പറഞ്ഞുതരും."
  },
  {
    keys: ["parts of speech", "noun", "verb", "adjective", "വ്യാകരണം"],
    subject: "english",
    en: "Parts of speech:\n\n• Noun: a person, place or thing — Pandi, school, book.\n• Pronoun: replaces a noun — he, she, it, they.\n• Verb: the action or state — write, is, run.\n• Adjective: describes a noun — tall, green, helpful.\n• Adverb: describes a verb or adjective — quickly, very.\n• Preposition: links words — in, on, under.\n• Conjunction: joins — and, but, because.\n• Interjection: shows feeling — oh, well.\n\nExam tip: find the verb first; the subject and object then fall into place around it.",
    ml: "പദവിഭാഗങ്ങൾ:\n\n• നാമം (Noun): വ്യക്തി, സ്ഥലം, വസ്തു — Pandi, school, book.\n• സർവ്വനാമം (Pronoun): he, she, it, they.\n• ക്രിയ (Verb): write, is, run.\n• വിശേഷണം (Adjective): tall, green, helpful.\n• ക്രിയാവിശേഷണം (Adverb): quickly, very.\n• ഉപസർഗ്ഗം (Preposition): in, on, under.\n• സംയോജകം (Conjunction): and, but, because.\n• വ്യാക്ഷേപകം (Interjection): oh, well.\n\nപരീക്ഷാ നുറുങ്ങ്: ആദ്യം ക്രിയ കണ്ടെത്തുക."
  },
  {
    keys: ["passive voice", "active voice", "reported speech", "indirect speech"],
    subject: "english",
    en: "Active to passive:\n\n• The object becomes the subject; the verb becomes be + past participle; the doer goes after by.\n• The teacher corrects the answers → The answers are corrected by the teacher.\n• Keep the tense: is/are + past participle (present), was/were + past participle (past), will be + past participle (future).\n\nDirect to indirect speech:\n\n• Change the reporting verb and shift the tense back one step; now → then, today → that day, here → there.\n• He said, \"I am busy today.\" → He said that he was busy that day.\n\nExam tip: write the whole sentence, not just the verb — half answers lose the mark.",
    ml: "ആക്ടീവിൽ നിന്ന് പാസീവിലേക്ക്:\n\n• കർമ്മം കർത്താവാകും; ക്രിയ be + past participle ആകും; ചെയ്യുന്നയാൾ by യ്ക്ക് ശേഷം.\n• The teacher corrects the answers → The answers are corrected by the teacher.\n• കാലം മാറ്റരുത്: is/are + past participle, was/were + past participle, will be + past participle.\n\nനേരിട്ടുള്ള സംഭാഷണത്തിൽ നിന്ന് പരോക്ഷത്തിലേക്ക്:\n\n• റിപ്പോർട്ടിംഗ് ക്രിയ മാറ്റി കാലം ഒരു ഘട്ടം പിന്നോട്ട്; now → then, today → that day, here → there.\n• He said, \"I am busy today.\" → He said that he was busy that day.\n\nപരീക്ഷാ നുറുങ്ങ്: ക്രിയ മാത്രമല്ല, മുഴുവൻ വാക്യവും എഴുതുക."
  },
  {
    keys: ["letter writing", "essay", "paragraph", "കത്ത്", "ഉപന്യാസം"],
    subject: "english",
    en: "Writing marks that examiners look for:\n\nEssay or paragraph:\n1. One clear opening sentence that states your point.\n2. Two or three paragraphs, one idea each, with an example.\n3. Linking words: firstly, however, therefore, in conclusion.\n4. A closing sentence that answers the question.\n\nLetter:\n• Formal: sender address, date, receiver address, subject, salutation, body, closing.\n• Informal: address, date, dear name, body, yours lovingly.\n\nExam tip: short correct sentences earn more than long risky ones.",
    ml: "എഴുത്തിൽ പരീക്ഷകർ നോക്കുന്ന കാര്യങ്ങൾ:\n\nഉപന്യാസം / ഖണ്ഡിക:\n1. ആശയം വ്യക്തമാക്കുന്ന ആദ്യ വാക്യം.\n2. രണ്ടോ മൂന്നോ ഖണ്ഡിക, ഓരോന്നിനും ഒരു ആശയവും ഉദാഹരണവും.\n3. ബന്ധിപ്പിക്കുന്ന വാക്കുകൾ: firstly, however, therefore, in conclusion.\n4. ചോദ്യത്തിന് ഉത്തരം നൽകുന്ന അവസാന വാക്യം.\n\nകത്ത്:\n• ഔദ്യോഗികം: വിലാസം, തീയതി, സ്വീകരിക്കുന്നയാളുടെ വിലാസം, വിഷയം, അഭിവാദ്യം, ഉള്ളടക്കം, സമാപനം.\n• അനൗദ്യോഗികം: വിലാസം, തീയതി, പേര്, ഉള്ളടക്കം, yours lovingly.\n\nപരീക്ഷാ നുറുങ്ങ്: നീളമുള്ള വാക്യങ്ങളേക്കാൾ ചെറുതും കൃത്യവുമായ വാക്യങ്ങൾ നല്ലത്."
  },
  {
    keys: ["journal", "ledger", "ജേണൽ", "accountancy", "debit", "credit"],
    subject: "commerce",
    en: "Journal and ledger:\n\n• Debit what comes in, credit what goes out. Debit the receiver, credit the giver. Debit expenses and losses, credit incomes and gains.\n• Journal entry: date, particulars (Dr line and Cr line), L.F., debit amount, credit amount, narration.\n• Bought goods for cash 5,000 → Purchases A/c Dr 5,000; To Cash A/c 5,000.\n• Ledger: each account is posted from the journal.\n\nExam tip: total debits must equal total credits in every entry — check before writing the narration.",
    ml: "ജേണലും ലെഡ്ജറും:\n\n• വരുന്നത് ഡെബിറ്റ്, പോകുന്നത് ക്രെഡിറ്റ്. സ്വീകരിക്കുന്നയാൾ ഡെബിറ്റ്, നൽകുന്നയാൾ ക്രെഡിറ്റ്.\n• ജേണൽ രൂപം: തീയതി, വിവരണം, L.F., ഡെബിറ്റ് തുക, ക്രെഡിറ്റ് തുക, വിശദീകരണം.\n• ക്യാഷ് 5,000ന് സാധനങ്ങൾ വാങ്ങി → Purchases A/c Dr 5,000; To Cash A/c 5,000.\n• ലെഡ്ജർ: ഓരോ അക്കൗണ്ടിലേക്കും ജേണലിൽ നിന്ന് പോസ്റ്റ് ചെയ്യുന്നു.\n\nപരീക്ഷാ നുറുങ്ങ്: ഓരോ എൻട്രിയിലും ഡെബിറ്റ് = ക്രെഡിറ്റ് എന്ന് പരിശോധിക്കുക."
  },
  {
    keys: ["trial balance", "final accounts", "balance sheet", "ട്രയൽ ബാലൻസ്", "trading account"],
    subject: "commerce",
    en: "From trial balance to final accounts:\n\n• The trial balance lists all ledger balances; total debit must equal total credit.\n• Trading account gives gross profit: sales − cost of goods sold (opening stock + purchases + direct expenses − closing stock).\n• Profit and loss account deducts indirect expenses (rent, salary, depreciation) from gross profit to give net profit.\n• Balance sheet shows assets and liabilities on the closing date; both sides must tally.\n\nExam tip: work out closing stock and cost of goods sold first — most of the paper depends on those two numbers.",
    ml: "ട്രയൽ ബാലൻസിൽ നിന്ന് അന്തിമ അക്കൗണ്ടുകളിലേക്ക്:\n\n• ട്രയൽ ബാലൻസിൽ എല്ലാ ലെഡ്ജർ ബാലൻസുകളും; ഡെബിറ്റ് = ക്രെഡിറ്റ് ആയിരിക്കണം.\n• ട്രേഡിംഗ് അക്കൗണ്ട് മൊത്ത ലാഭം: വിൽപ്പന − വിറ്റ സാധനങ്ങളുടെ ചെലവ്.\n• ലാഭനഷ്ട അക്കൗണ്ടിൽ പരോക്ഷ ചെലവുകൾ കുറച്ച് അറ്റാദായം.\n• ബാലൻസ് ഷീറ്റിൽ ആസ്തികളും ബാധ്യതകളും; ഇരുവശവും തുല്യമായിരിക്കണം.\n\nപരീക്ഷാ നുറുങ്ങ്: ആദ്യം അവസാന സ്റ്റോക്കും വിറ്റ സാധനങ്ങളുടെ ചെലവും കണക്കാക്കുക."
  },
  {
    keys: ["depreciation", "മൂല്യക്ഷയം", "straight line", "written down value"],
    subject: "commerce",
    en: "Depreciation:\n\n• The fall in the value of a fixed asset due to use, time or obsolescence.\n• Straight line method: (cost − scrap value) ÷ useful life, the same amount every year.\n• Written down value method: fixed percentage on the book value, so the amount falls each year.\n• Asset 1,00,000, scrap 10,000, life 9 years → straight line 10,000 a year.\n• Depreciation is a non-cash expense: it appears in the P&L and reduces the asset in the balance sheet.\n\nExam tip: show the working note; name the method and the rate in the answer.",
    ml: "മൂല്യക്ഷയം:\n\n• ഉപയോഗം, കാലം, കാലഹരണം എന്നിവയാൽ സ്ഥിര ആസ്തിയുടെ മൂല്യം കുറയുന്നത്.\n• നേർരേഖ രീതി: (വില − ശിഷ്ട മൂല്യം) ÷ ഉപയോഗകാലം, എല്ലാ വർഷവും ഒരേ തുക.\n• കുറയുന്ന മൂല്യ രീതി: പുസ്തക മൂല്യത്തിൽ സ്ഥിര ശതമാനം.\n• ആസ്തി 1,00,000, ശിഷ്ടം 10,000, 9 വർഷം → നേർരേഖ രീതിയിൽ വർഷം 10,000.\n• മൂല്യക്ഷയം പണമല്ലാത്ത ചെലവാണ്.\n\nപരീക്ഷാ നുറുങ്ങ്: കണക്ക് കാണിക്കുക; രീതിയും നിരക്കും എഴുതണം."
  },
  {
    keys: ["demand", "supply", "ഡിമാൻഡ്", "economics", "elasticity", "price"],
    subject: "commerce",
    en: "Demand and supply:\n\n• Law of demand: other things equal, when price rises, quantity demanded falls — the demand curve slopes downward.\n• Law of supply: when price rises, quantity supplied rises — the supply curve slopes upward.\n• Equilibrium is where the two curves meet; above it surplus, below it shortage.\n• Elasticity measures how much quantity responds to price. Necessities are inelastic, luxuries elastic.\n• Determinants of demand: price, income, taste, price of substitutes, population.\n\nExam tip: draw both curves and mark the equilibrium point — the diagram usually carries marks by itself.",
    ml: "ആവശ്യകതയും വിതരണവും:\n\n• ആവശ്യകതാ നിയമം: വില കൂടിയാൽ ആവശ്യകത കുറയും — ഡിമാൻഡ് വക്രം താഴേക്ക്.\n• വിതരണ നിയമം: വില കൂടിയാൽ വിതരണം കൂടും — വക്രം മുകളിലേക്ക്.\n• സന്തുലനം രണ്ട് വക്രങ്ങളും കൂടുന്നിടത്ത്; മുകളിൽ മിച്ചം, താഴെ കമ്മി.\n• ഇലാസ്തികത വിലയോടുള്ള പ്രതികരണം അളക്കുന്നു.\n• ആവശ്യകതയെ നിർണ്ണയിക്കുന്നത്: വില, വരുമാനം, അഭിരുചി, പകരം വസ്തുവിന്റെ വില, ജനസംഖ്യ.\n\nപരീക്ഷാ നുറുങ്ങ്: രണ്ട് വക്രങ്ങളും വരച്ച് സന്തുലന ബിന്ദു അടയാളപ്പെടുത്തുക."
  },
  {
    keys: ["gdp", "inflation", "national income", "budget", "ജിഡിപി"],
    subject: "commerce",
    en: "GDP, inflation and the budget:\n\n• GDP is the market value of all final goods and services produced in a country in a year.\n• Nominal GDP uses current prices; real GDP uses constant prices, so it shows true growth.\n• Inflation is a sustained rise in the general price level; it reduces purchasing power. India measures it with the CPI.\n• The budget is the government annual income and expenditure statement: revenue receipts, capital receipts, revenue and capital expenditure, fiscal deficit.\n\nExam tip: define the term, give one India example, then one effect — that three-line shape fits almost every 3-mark question.",
    ml: "ജിഡിപി, പണപ്പെരുപ്പം, ബജറ്റ്:\n\n• ജിഡിപി ഒരു വർഷത്തിൽ രാജ്യത്ത് ഉത്പാദിപ്പിച്ച അന്തിമ വസ്തുസേവനങ്ങളുടെ വിപണി മൂല്യം.\n• നോമിനൽ ജിഡിപി നിലവിലെ വിലയിൽ; റിയൽ ജിഡിപി സ്ഥിര വിലയിൽ.\n• പണപ്പെരുപ്പം വിലയിലെ തുടർച്ചയായ വർദ്ധനവ്; വാങ്ങൽശേഷി കുറയ്ക്കുന്നു.\n• ബജറ്റ് സർക്കാരിന്റെ വാർഷിക വരുമാന-ചെലവ് പ്രസ്താവന.\n\nപരീക്ഷാ നുറുങ്ങ്: നിർവചനം, ഒരു ഉദാഹരണം, ഒരു ഫലം — ഈ മൂന്ന് വരി മിക്ക 3 മാർക്ക് ചോദ്യങ്ങൾക്കും മതി."
  },
  {
    keys: ["business", "management", "marketing", "ബിസിനസ്", "cooperative society"],
    subject: "commerce",
    en: "Business studies essentials:\n\n• Forms of organisation: sole proprietorship, partnership, HUF, cooperative society, company. A company has separate legal identity and limited liability.\n• Functions of management: planning, organising, staffing, directing, controlling.\n• Marketing mix, the 4 Ps: product, price, place, promotion.\n• Advertising informs and persuades; personal selling builds trust; sales promotion gives a short-term push.\n• Business environment includes economic, social, legal, technological and political factors.\n\nExam tip: in a 5-mark answer name the concept, define it in one line, then give a Kerala example such as a cooperative society or a self-help group.",
    ml: "ബിസിനസ് പഠനത്തിന്റെ അടിസ്ഥാനം:\n\n• സംഘടനാ രൂപങ്ങൾ: ഒറ്റയാൾ വ്യാപാരം, പങ്കാളിത്തം, കൂട്ടുകുടുംബം, സഹകരണ സംഘം, കമ്പനി.\n• മാനേജ്മെന്റ് ധർമ്മങ്ങൾ: ആസൂത്രണം, സംഘടന, സ്റ്റാഫിംഗ്, നിർദ്ദേശം, നിയന്ത്രണം.\n• മാർക്കറ്റിംഗ് മിക്സ് — 4 P: ഉത്പന്നം, വില, സ്ഥലം, പ്രചാരണം.\n• പരസ്യം അറിയിക്കുകയും പ്രേരിപ്പിക്കുകയും ചെയ്യുന്നു.\n• ബിസിനസ് പരിസ്ഥിതി: സാമ്പത്തിക, സാമൂഹിക, നിയമ, സാങ്കേതിക, രാഷ്ട്രീയ ഘടകങ്ങൾ.\n\nപരീക്ഷാ നുറുങ്ങ്: 5 മാർക്ക് ഉത്തരത്തിൽ ആശയം, നിർവചനം, കേരളത്തിൽ നിന്നുള്ള ഉദാഹരണം."
  },
];
