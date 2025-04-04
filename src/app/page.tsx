import Link from "next/link";
import { getAllItems } from "@/utils/items";
import HevrutaInfoSections from "@/components/HevrutaInfoSections";

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

    <HevrutaInfoSections/>
      

    </div>

  );
} 