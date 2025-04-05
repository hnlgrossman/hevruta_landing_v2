import Link from "next/link";
import { getAllItems } from "@/utils/items";
import HevrutaInfoSections from "@/components/HevrutaInfoSections";
import { getWhatsappCtaLink } from "@/utils/main";

export default async function Home() {
  const products = getAllItems();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero padding-space" data-user-tracking="דף בית - עליון">
      <div className="container">
        <div className="hero__content">
          <div className="hero__logo">
            <img src="/logo_big.svg" alt="חברותא" width={400} height={200} className="hero__logo-img" />
          </div>
          <div className="hero__text">
            <h1 className="title">
              ברוכים הבאים לקטלוג המוצרים <span className="title-highlight">המשתלם ביותר</span> בישראל.
            </h1>
            <p className="paragraph">
              כאן אנחנו מציעים את המוצרים הטובים ביותר במחיר הזול ביותר בזכות מנגנון הכוח קנייה שלא יאכזב אף שעון
              שוויצרי באמינותו ודיוקו.
            </p>
            <div className="cta-area">
              <a href="#products" className="cta-button">
                לצפייה במוצרים
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="products" className="products padding-space" data-user-tracking="דף בית - מוצרים">
      <div className="container">
        <h2 className="title title-center">
          <span className="title-highlight">המוצרים</span> שלנו
        </h2>
        <p className="paragraph paragraph-center">המוצרים האיכותיים ביותר במחירים הטובים ביותר</p>

        <div className="products__grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="img_text_con">

              <div className="product-card__brand">
                <img
                  src={product.brandImageUrl || "/placeholder.svg"}
                  alt="מותג"
                  width={80}
                  height={30}
                  className="product-card__brand-img"
                />
              </div>

              <div className="product-card__image">
                <img
                  src={product.productImageUrl || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="product-card__img"
                />
              </div>

              <div className="product-card__content">
                <div className="product-card__info">
                  <h3 className="product-card__title" dangerouslySetInnerHTML={{ __html: product.shortTitle }} />

                  {/* <p className="product-card__description">{product.description}</p> */}
                  <div className="product-card__price-container">
                    <div className="product-card__price-box">
                      <span className="product-card__market-price">₪{product.marketPrice.toLocaleString()}</span>
                      <span className="product-card__price">₪{product.price.toLocaleString()}</span>
                    </div>
                    <div className="product-card__discount">
                      {Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)}% הנחה
                    </div>
                  </div>
                </div>

                <Link href={`/item/${product.slug}`} className="show_in_desktop cta-button product-card__button">
                  לפרטים נוספים
                </Link>
              </div>
              </div>
                <Link href={`/item/${product.slug}`} className="show_in_mobile cta-button product-card__button">
                  לפרטים נוספים
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WhatsApp Contact Section */}
    <section className="whatsapp-section padding-space">
      <div className="container">
        <div className="whatsapp-content">
          <h2 className="title title-center">
            לא מצאת את המוצר <span className="title-highlight">שחיפשת?</span>
          </h2>
          <a 
            href={getWhatsappCtaLink(null, ' אני מחפש מוצר שלא מופיע באתר...')} 
            className="whatsapp-button_home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"></path></svg>
            <span>דבר איתנו בוואטסאפ</span>
          </a>
        </div>
      </div>
    </section>

    <HevrutaInfoSections page_track_key="דף בית" />
      

    </div>

  );
} 