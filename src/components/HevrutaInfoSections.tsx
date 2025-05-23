import { getWhatsappCtaLink } from "@/utils/main";

export default async function HevrutaInfoSections({ page_track_key = "דף מוצר" }: { page_track_key?: string }) {
  const whatsappCtaLink = getWhatsappCtaLink();

  return (
    <div className="hevruta_info_sections">
            {/* Info Section */}
            <section id="info" className="info" data-user-tracking={`${page_track_key} - מידע`}>
        <div className="container no-space">
          <div className="info__content">
            <div className="padding-space">
              <h2 className="title">
                לפני שמתקדמים רוצה
                <br />
                קודם לקרוא קצת
                <br />
                עלינו?
                <br />
                <span className="title-highlight title-letterspace">באהבה!</span>
              </h2>
              <p className="paragraph">
                <span className="paragraph__highlight">חברותא</span> היא חברה ראשונה
                מסוגה שמאמינה בכל ליבה ש:
              </p>
              <p className="paragraph">
                <span className="paragraph__highlight">
                  אפשר לקנות את מוצרי החשמל האיכותיים בשוק מבלי לקרוע את הכיס.
                </span>
              </p>
              <p className="paragraph">
                וכמובן גם מבלי להתפשר על המוצרים הסיניים הזולים שמוצעים בחנויות
              </p>
              <p className="paragraph">
                <span className="paragraph__highlight">בחברותא</span> מצאנו את
                הפתרונות הכי טובים לקניית המותגים המובילים בשוק במהירויות שיא.
              </p>
              <p className="paragraph paragraph__highlight info__question">
                אז איך הקסם קורה?
              </p>
              <p className="paragraph">כוח קנייה.</p>
              <p className="paragraph">
                אמנם לא תרגישו בכך מפני שמגיע לכם שקט אחרי יום העבודה העמוס שלכם.
              </p>
              <p className="paragraph">
                אבל מאחורי הקלעים
                <span className="paragraph__highlight space-word">חברותא</span>
                מרכזת עשרות לקוחות כל יום במטרה ליצור כוח קנייה (בקבוצות)
              </p>
              <p className="paragraph">מה שמאפשר הורדת מחירים</p>
              <p className="paragraph paragraph__highlight-red paragraph-big paragraph-bold">
                שאין לה מתחרים בשוק.
              </p>
              <h3 className="title title-bottom">וכל זה בתהליך פשוט לחלוטין!</h3>
            </div>
            <div className="info__image">
              <img src="/images/globle/costumer_ju.svg" alt="תהליך הרכישה" />
            </div>
            <div className="padding-space">
              <p className="paragraph">
                תקבלו את הטוב ביותר
                <span className="paragraph__highlight space-word">במחיר הזול ביותר.</span>
                <br />
                כבר אמרנו?
              </p>
              <div className="cta-area">
                <p className="paragraph">אז למה אתם מחכים?</p>
                <div className="cta-icon-container">
                  <img
                    src="/images/globle/con_icon.png"
                    alt="כוח קנייה"
                    className="cta-icon"
                  />
                </div>
                <a href={whatsappCtaLink} className="cta-button blue-button big-button">
                תלחצו ותהיו הקונים החכמים בישראל                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section id="process" className="process" data-user-tracking={`${page_track_key} - תהליך`}>
        <div className="container padding-space">
          <div className="padding-space"></div>
          <div className="process__content">
            <h2 className="title title-nomargin">
              <div className="title-highlight title-center">
                אם אתם תוהים לעצמכם איך אנחנו מגיעים לאחוזי הנחה גבוהים?
              </div>
            </h2>
            <p className="paragraph paragraph-sml">הדרך פשוטה.</p>
            <div className="process__explanation">
              <h3 className="title title-nomargin title-blue">
                מנגנון בניית כוח הקנייה של חברותא.
              </h3>
              <p className="paragraph">
                חברותא מנהלת מאחורי הקלעים מאגרי לקוחות עצומים כאשר כל לקוח שפונה
                לחברותא מותאם בפינצטה
                <br />
                לקבוצת הקנייה שמתאימה לו בזכות המומחים שלנו.
                <br />
                כוח הקנייה שאנחנו יוצרים מכוון ישירות אל הספקים
              </p>
              <p className="paragraph paragraph__highlight-red paragraph-bold">
                ומאפשר לנו להשיג דילים היסטריים עבורכם
              </p>
              <p className="paragraph">
                במחיר בדיחה עם שירות ממעלה ראשונה ואחריות יבואן.
              </p>
              <p className="paragraph paragraph__highlight paragraph-big paragraph-bold">
                וזה לא נגמר כאן...
              </p>
              <p className="paragraph">
                למי שמכיר את הקונספט, לחברותא יש יכולת נוספת שמאיצה את כל כוח הקנייה
                שלה והיא
              </p>
              <p className="paragraph paragraph__highlight paragraph-xbig paragraph-bold">
                קבוצות היברידיות
              </p>
              <p className="paragraph">
                הקבוצות ההיברדיות של חברותא הן קבוצות מיוחדות שמאפשרות לנו לאחד
                קבוצות גם כשהן לא ממוקדות על מוצר אחד.
              </p>
              <p className="paragraph">
                כלומר אנחנו יכולים לקדם את הקנייה
                <span className="paragraph__highlight space-word">
                  אפילו יותר מהר ממה שאתם חושבים!
                </span>
              </p>
              <h3 className="title title-blue">
                תמיכת המוצרים של חברותא - <br />
                זמינים 24\7 בשבילכם
              </h3>
              <p className="paragraph">
                חברותא מנהלת צוות תצפיתנים ייעודי שסורק את כלל הגזרות בשוק כל יום כל
                שעה.
              </p>
              <p className="paragraph">
                ככה אנחנו מסוגלים תמיד לבנות את הדילים המשתלמים ביותר עם המוצרים
                החמים ביותר בשוק.
              </p>
              <div className="process__text_image">
                <img
                  src="/images/globle/text_img_1.png"
                  alt="תמיכת המוצרים של חברותא"
                />
              </div>
              <p className="paragraph paragraph__highlight-red paragraph-bold paragraph-big">
                תקבלו את הטוב ביותר
                <br />
                במחיר הזול ביותר.
                <br />
                כבר אמרנו?
              </p>
              <div className="cta-area">
                <p className="paragraph paragraph-big paragraph-bold paragraph__highlight-red ">
                  אז למה אתם מחכים?
                </p>
                <div className="cta-icon-container">
                  <img
                    src="/images/globle/con_icon.png"
                    alt="כוח קנייה"
                    className="cta-icon"
                  />
                </div>
                <a href={whatsappCtaLink} className="cta-button green-button big-button pulse-animation">
                לחץ כאן עכשיו וקבל את הדיל הכי טוב בשוק                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="faq" data-user-tracking={`${page_track_key} - שאלות ותשובות`}>
        <div className="container">
          <div className="padding-space">
            <h2 className="title title-dark title-center">
              אם אתם חושבים שיש
              <br />
              קאץ&apos;
              <span className="paragraph__highlight-red paragraph-bold">
                אז אין.
              </span>
            </h2>
            <div className="faq__items">
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/qtn.png"
                      alt="סימן שאלה"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">
                    &quot;מאמי לא יודעת, איך הם משיגים מחירים כאלה?&quot;
                  </p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    אל דאגה אנחנו נסביר. אנחנו עוקפים שרשרת שלמה של ספקי מוצרים
                    ורוכשים את המוצרים בכמות גדולה באמצעות ריכוז של מספר לקוחות יחד
                    (מנגנון בניית כוח קנייה),{" "}
                    <span className="faq__highlight">
                      ככה אנחנו משיגים מחירים שאף רשת בשוק לא יכולה לספק.
                    </span>
                  </p>
                  {/* <p class="faq__note">
                  (להסבר נוסף על מנגנון כוח הקנייה המשופר של חברותא)
                </p> */}
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/scared.png"
                      alt="אדם מהסס"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">&quot;אבל אני לא רוצה להתחייב&quot;</p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    <span className="paragraph__highlight-red paragraph-bold">
                      אתם לא מתחייבים לכלום!
                    </span>
                    <br />
                    תוכלו לבקש לצאת מקבוצת הרכישה בכל שלב (עד לשלב התשלום שבו אתם
                    רוכשים את המוצרים)
                  </p>
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/comversation.png"
                      alt="שעון"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">
                    &quot;חיים שלי אין לי זמן לחכות עד שהקבוצה תהיה מוכנה&quot;
                  </p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    מסכימים איתכם אין זמן לחכות. הקבוצה תיסגר עוד לפני שתספיקו לנסוע
                    לחנות הקרובה, להחליט מה כי טוב, לקבל הצעת מחיר, להתמקח עם המוכר
                    המתיש ואז להבין
                    <span className="paragraph__highlight-red paragraph-bold space-word">
                      שבחברותא מציעים מחיר טוב יותר וכל זה מבלי לצאת לפקקים
                    </span>
                    ולהרפתקאות בחיפוש אחר החנייה (שלא נדבר על לארגן את הילדים ליציאה
                    :) )
                  </p>
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/frustrated.png"
                      alt="שעון"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">&quot;אוף אבל אין כאן את הדגם שחיפשתי&quot;</p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    לא צריך להיכנס לפאניקה. חברותא יכולה לעזור לכם להשיג
                    <span className="paragraph__highlight-red paragraph-bold space-word">
                      גם מוצרים שלא נמצאים בקטלוג שלנו
                    </span>
                    (הקטלוג תמיד משתנה ומתרחב).
                  </p>
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/conflict.png"
                      alt="שעון"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">&quot;רגע מה עם אחריות?&quot;</p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    <span className="paragraph__highlight-red paragraph-bold">
                      יש אחריות יבואן לכלל המוצרים!
                    </span>
                  </p>
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/split.png"
                      alt="שעון"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">&quot;אפשר לפרוס לתשלומים?&quot;</p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    <span className="paragraph__highlight-red paragraph-bold space-word">
                      כמובן.
                    </span>
                    תמיד ניתן לפרוס את הקנייה לתשלומים.
                  </p>
                </div>
              </div>
              <div className="faq__item">
                <div className="faq__header">
                  <div className="faq__icon-container">
                    <img
                      src="/images/globle/build.png"
                      alt="שעון"
                      className="faq__icon"
                    />
                  </div>
                  <p className="faq__question">
                    &quot;אבל עשו לנו דיל לכמה מוצרים יחד ברשת אחרת&quot;
                  </p>
                </div>
                <div className="faq__body">
                  <p className="faq__answer">
                    בחברותא כל קנייה היא כמו דיל לכמה מוצרים. רק שאצלנו תוכלו להרכיב
                    את חבילת המוצרים שאתם תבחרו וגם אם לא תבחרו את כולם
                    <span className="paragraph__highlight-red paragraph-bold space-word">
                      עדיין תקבלו הנחה טובה
                    </span>
                    יותר מברשתות האחרות בקניות יותר יקרות.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq__cta-button">
              <a href={whatsappCtaLink} className="cta-button red-button big-button shadow-effect">
                בואו לחסוך זמן וכסף עכשיו!
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Guarantees Section */}
      <section className="guarantees" data-user-tracking={`${page_track_key} - ביטוחים`}>
        <div className="container">
          <div className="padding-space">
            <h2 className="guarantees__title">
              תחשבו על
              <br />
              הזוגיות שלכם
            </h2>
            <p className="guarantees__subtitle">
              (הויכוח עם המוכר בחנות לא שווה את 
              <br />
              המכונת כביסה הזאת)
            </p>
            {/* <a href="#" className="guarantees__button">
              שומרים על זכויות
              <br />
              בריאה בחברותא
            </a> */}
            <p className="paragraph">
              אם יש יעד שאנחנו מציבים
              <br />
              לעצמנו בראש בחברותא זה
            </p>
            <p className="paragraph paragraph__highlight paragraph-bold">שהלקוח חייב להיות מרוצה.</p>
            <p className="paragraph">
            הרי כולנו מרגישים את המציאות המורכבת שאנחנו חיים בה כישראלים


            </p>
            <div className="guarantees__benefits">
              <div className="guarantees__benefit">
                <div className="guarantees__benefit-icon-container">
                  <img
                    src="/images/globle/war_icon.png"
                    alt="לוחם"
                    className="guarantees__benefit-icon"
                  />
                </div>
                <p className="guarantees__benefit-text">מלחמה</p>
              </div>
              <div className="guarantees__benefit">
                <div className="guarantees__benefit-icon-container">
                  <img
                    src="/images/globle/partner_icon.png"
                    alt="רץ"
                    className="guarantees__benefit-icon"
                  />
                </div>
                <p className="guarantees__benefit-text">
                  הפוליטיקה
                  <br />
                  המורכבת
                </p>
              </div>
              <div className="guarantees__benefit">
                <div className="guarantees__benefit-icon-container">
                  <img
                    src="/images/globle/living_price.png"
                    alt="קשת"
                    className="guarantees__benefit-icon"
                  />
                </div>
                <p className="guarantees__benefit-text">
                  יוקר המחייה שרק
                  <br />
                  ממשיך לעלות
                </p>
              </div>
            </div>
            <div className="guarantees__additional">
              <h3 className="paragraph paragraph-big paragraph-bold paragraph__highlight">
                ועוד לא הכנסנו את
                <br />
                הלחצים בבית...
              </h3>
              <div className="guarantees__questions">
                <p className="paragraph paragraph-center paragraph-nomargin ">
                  מה עם המשפחה?
                </p>
                <p className="paragraph paragraph-center paragraph-nomargin ">
                  הזוגיות?
                </p>
                <p className="paragraph paragraph-center paragraph-nomargin ">
                  עתיד הילדים?
                </p>
              </div>
              <p className="paragraph paragraph-center">
                חלקנו עושים חייל במילואים וחלקנו
                <span className="paragraph paragraph__highlight-red paragraph-bold space-word">
                  עובדים שעות לא שעות
                </span>
                <br />
                כאזרחים שאפתניים.
              </p>
              <p className="paragraph paragraph-center">
                מרוץ החיים נמשך ותוך כדי הנשימות המותשות אנחנו תמיד מחליקים את היד
                לכיס כדי להבין
              </p>
              <p className="paragraph paragraph-center paragraph__highlight paragraph-big">
                מה קורה שם
              </p>
              <p className="paragraph paragraph-center paragraph-big">
                וסיר הלחץ הזה גורם לנו לחשוב
              </p>
              <div className="guarantees__question-block">
                <p className="paragraph paragraph-center paragraph-mbig paragraph__highlight-green">
                  האם זה הזמן להתפנק על
                  <br />
                  חופשה?
                </p>
              </div>
              <div className="guarantees__question-block">
                <p className="paragraph paragraph-center paragraph-mbig paragraph__highlight-green">
                  האם זה הזמן הנכון לקנות
                  <br />
                  משהו חדש לבית?
                </p>
              </div>
              <div className="guarantees__question-block">
                <p className="paragraph paragraph-center paragraph-big paragraph__highlight">
                  או שאנחנו צריכים
                  <br />
                  להתאפק עוד קצת?
                </p>
              </div>
              <p className="paragraph paragraph-center paragraph-mbig">
                למה להתפשר אם אפשר לקנות
                <br />
                גם מבלי לקרוע את הכיס.
              </p>
              <p className="paragraph paragraph-center paragraph-mbig">
                רק צריך לדעת לעשות את זה
                <br />
                בצורה חכמה
              </p>
              <p className="paragraph paragraph-center paragraph-xbig paragraph__highlight-red paragraph-bold">
                תמיד יש דרך להגשים את החלום ובחברותא אנחנו מתחייבים לעזור לכם!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}