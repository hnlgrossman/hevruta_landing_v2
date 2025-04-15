import { notFound } from 'next/navigation';
import { getItemById, getAllItems } from '@/utils/items';
import CountdownTimer from '@/components/CountdownTimer';
import ProductDetails from '@/components/ProductDetails';
import { getWhatsappCtaLink } from '@/utils/main';
import HevrutaInfoSections from '@/components/HevrutaInfoSections';
import Link from 'next/link';

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

  const whatsappCtaLink = getWhatsappCtaLink(item);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero padding-space" data-user-tracking="דף מוצר - עליון">
        <div className="container">
          <h1 className="hero__title">
            <span className="hero__title-main">ברוך הבא לקבוצת</span>
            <span className="hero__title-sub">רכישה ל
              {item.name}
            </span>
          </h1>
          <p className="hero__description">
            {/* <span dangerouslySetInnerHTML={{ __html: item.shortTitle }} /> */}
            {item.description}
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
            <div className="product__price-tag-container">
              <div className="product__price-tag">
                <div className="product__price-label">מחיר חברותא</div>
                <div className="product__price-current"><span className="product__price-skl">₪</span>{item.price}</div>
                <div className="product__price-discount">
                  <span className="product__price-savings">
                  חיסכון מטורף של- 
                  <span className="product__price-savings-amount">
                    <span className="product__price-skl">₪</span>{item.marketPrice - item.price}
                  </span>
                  </span>
                </div>
              </div>
              <div className="product__market-price">
                <div className="product__market-price-label">מחיר שוק</div>
                <div className="product__market-price-value"><span className="product__price-skl">₪</span>{item.marketPrice}</div>
              </div>
            </div>
            <ProductDetails 
              item={item}
            />
            <div className="product__buttons">
              <a 
                href={whatsappCtaLink}
                className="cta-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta-button__text">
                  לפרטים נוספים
                  <br />
                  ורכישה לחץ כאן
                </span>
              </a>
              <Link 
                href="/"
                className="cta-button cta-button--home"
              >
                <span className="cta-button__text">
                  לכל  המוצרים שלנו
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats" data-user-tracking="דף מוצר - סטטיסטיקות">
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
              <p className="stats__date">22.04.25</p>
              <span className="stats__timer">
                <p className="stats__timer-label">שעות לסיום</p>
                <CountdownTimer endDate={new Date('2025-04-23')} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" data-user-tracking="דף מוצר - תכונות">
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
                  src="/images/globle/star.png"
                  alt="אחריות יצרן מלאה"
                  className="feature__icon"
                />
                <span className='on_img_text'>אחריות יצרן מלאה</span>
              </div>
              {/* <div className="feature__text">אחריות יצרן מלאה</div> */}
            </div>
            <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/supli.png"
                  alt="התקנה מהירה"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">שילוח חינם</div>
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
            {/* <div className="feature">
              <div className="feature__icon-container">
                <img
                  src="/images/globle/energi_rate.png"
                  alt="משלוח חינם"
                  className="feature__icon"
                />
              </div>
              <div className="feature__text">חסכוני בדירוג אנרגטי A</div>
            </div> */}
          </div>
        </div>
      </section>


      <HevrutaInfoSections/>

    </div>

  );
} 