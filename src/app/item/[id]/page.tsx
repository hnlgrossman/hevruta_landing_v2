import { notFound } from 'next/navigation';
import { getItemById, getAllItems } from '@/utils/items';
import CountdownTimer from '@/components/CountdownTimer';
import ProductDetails from '@/components/ProductDetails';

export function generateStaticParams() {
  const items = getAllItems();
  
  return items.map(item => ({
    id: item.id.toString()
  }));
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const item = getItemById(id);
  
  if (!item) {
    notFound();
  }
  
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero padding-space">
        <div className="container">
          <h1 className="hero__title">
            <span className="hero__title-main">ברוך הבא לקבוצת</span>
            <span className="hero__title-sub">רכישה ל
              {item.name}
            </span>
          </h1>
          <p className="hero__description">
            <div dangerouslySetInnerHTML={{ __html: item.shortTitle }} />
          </p>
          <div className="product">
            <div className="product__image-container">
              <div className="product__brand">
                <img
                  src={item.brandImageUrl}
                  alt="LG Logo"
                  className="product__brand-logo"
                />
              </div>
              <img
                src={item.productImageUrl}
                alt="מכונת כביסה LG"
                className="product__image"
              />
            </div>
            <div className="product__price-tag">
              <div className="product__price-label">מחיר חברותא:</div>
              <div className="product__price-current">₪{item.price}</div>
              <div className="product__price-discount">
                <span className="product__price-original">מחיר שוק: ₪{item.marketPrice}</span>
                <span className="product__price-savings">
                  חיסכון מוערך של- ₪{item.marketPrice - item.price}
                </span>
              </div>
            </div>
            <ProductDetails 
              description={item.description}
              longDescription={item.longDescription}
            />
            <a href="#" className="cta-button">
              <span className="cta-button__text">
                לפרטים נוספים
                <br />
                ורכישה לחץ כאן
              </span>
            </a>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__labels">
            <div className="stats__label">
              <img
                src="/images/globle/ppl_group.png"
                alt="אנשים"
                className="stats__icon"
              />
              <p className="stats__label-text">
                יעד משתתפים
                <br />
                בקבוצה
              </p>
            </div>
            <div className="stats__label">
              <img
                src="/images/globle/flag_vi.png"
                alt="תאריך"
                className="stats__icon"
              />
              <p className="stats__label-text">
                תאריך סיום
                <br />
                הקבוצה
              </p>
            </div>
          </div>
          <div className="stats__values">
            <div className="stats__value stats__value--people">
              <p className="stats__people-count">5</p>
              <div className="stats__people-indicators">
                <span className="indicator indicator--empty" />
                <span className="indicator indicator--empty" />
                <span className="indicator indicator--filled" />
                <span className="indicator indicator--filled" />
                <span className="indicator indicator--filled" />
              </div>
            </div>
            <div className="stats__value stats__value--date">
              <p className="stats__date">{new Date(Date.now() + 8 * 60 * 60 * 1000 + 45 * 60 * 1000).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'}).split('/').join('.')}</p>
              <span className="stats__timer">
                <p className="stats__timer-label">שעות לסיום</p>
                <CountdownTimer endDate={new Date(Date.now() + 8 * 60 * 60 * 1000 + 45 * 60 * 1000)} />
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/payment.png"
                  alt="תשלום מאובטח"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">תשלום מאובטח</div>
            </div>
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/responsbility.png"
                  alt="אחריות יצרן מלאה"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">אחריות יצרן מלאה</div>
            </div>
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/supli.png"
                  alt="התקנה מהירה"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">התקנה מהירה</div>
            </div>
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/credits.png"
                  alt="שירות אמין"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">פריסה לתשלומים</div>
            </div>
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/energi_rate.png"
                  alt="משלוח חינם"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">חסכוני בדירוג אנרגטי A</div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      {/* <section className="products">
        <div className="container">
          <h2 className="products__title">מוצרים שאנחנו מוכרים</h2>
          <div className="products__grid">
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
            <div className="product-item" />
          </div>
          <a href="#" className="products__cta">
            לכל המוצרים שלנו לחץ כאן &gt;&gt;&gt;&gt;{" "}
          </a>
        </div>
      </section> */}


      {/* Info Section */}
      <section className="info">
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
                <span className="paragraph__highlight">חברותא</span>
                מרכזת עשרות לקוחות כל יום במטרה ליצור כוח קנייה (בקבוצות)
              </p>
              <p className="paragraph">מה שמאפשר הורדת מחירים</p>
              <p className="paragraph paragraph__highlight-red paragraph-big paragraph-bold">
                שאין לה מתחרים בשוק.
              </p>
              <h3 className="title title-bottom">וכל זה בתהליך פשוט לחלוטין!</h3>
            </div>
            <div className="info__image">
              <img src="/images/globle/sale_proccess.svg" alt="תהליך הרכישה" />
            </div>
            <div className="padding-space">
              <p className="paragraph">
                תקבלו את הטוב ביותר
                <span className="paragraph__highlight">במחיר הזול ביותר.</span>
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
                <a href="#" className="cta-button blue-button big-button">
                  תלחצו ותהיו הקונים החכמים בישראל!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="process">
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
                קבוצות הייבריידיות
              </p>
              <p className="paragraph">
                הקבוצות ההיברידיות של חברותא הן קבוצות מיוחדות שמאפשרות לנו לאחד
                קבוצות גם כשהן לא ממוקדות על מוצר אחד.
              </p>
              <p className="paragraph">
                כלומר אנחנו יכולים לקדם את הקנייה
                <span className="paragraph__highlight">
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
                <a href="#" className="cta-button blue-button big-button">
                  תלחצו ותהיו הקונים החכמים בישראל!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="faq">
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
                    <span className="paragraph__highlight-red paragraph-bold">
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
                    <span className="paragraph__highlight-red paragraph-bold">
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
                    <span className="paragraph__highlight-red paragraph-bold">
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
                    <span className="paragraph__highlight-red paragraph-bold">
                      עדיין תקבלו הנחה טובה
                    </span>
                    יותר מברשתות האחרות בקניות יותר יקרות.
                  </p>
                </div>
              </div>
            </div>
            <div className="faq__cta-button">
              <a href="#" className="cta-button red-button big-button">
                תלחצו ותהיו הקונים החכמים בישראל!
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Guarantees Section */}
      <section className="guarantees">
        <div className="container">
          <div className="padding-space">
            <h2 className="guarantees__title">
              תחשבו על
              <br />
              הזכויות שלכם
            </h2>
            <p className="guarantees__subtitle">
              (לרכישה עם המוכר בחברותא לא שווה את
              <br />
              ההכנסות לכיסוי הזמן)
            </p>
            <a href="#" className="guarantees__button">
              שומרים על זכויות
              <br />
              בריאה בחברותא
            </a>
            <p className="guarantees__text">
              אם יש יעד שאנחנו מציבים
              <br />
              לעצמנו בראש בחברותא זה
            </p>
            <p className="guarantees__highlight">שהלקוח חייב להיות מרוצה.</p>
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
                ההנחות בבית...
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
                <span className="paragraph paragraph__highlight-red paragraph-bold">
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
                וסיוט הלחץ הזה גורם לנו לחשוב
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

  );
} 