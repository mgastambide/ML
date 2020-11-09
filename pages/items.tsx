import {useState, useEffect, Fragment} from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Navbar from 'components/Navbar';
import HeadHtml from 'components/Head';
import Breadcrumbs from 'components/Breadcrumbs';

const Items = () => {

  const [products, setProducts] = useState({results:[{category_id:''}]})
  
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
      fetchData(String(router.query.search));
    }, [])

    useEffect(() => {

    }, [router.query.search])

    const fetchData = async (string) => {
      const data = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=:'+string+'&limit=4')
        const products = await data.json()
        setProducts(products)
        setLoading(true);
    }

    return (
        <div>
          <HeadHtml />
          <Navbar />
          {
            loading &&
            <Fragment>
                <Breadcrumbs props={products.results[0].category_id} />
                <section>
                  <div className="container">
                    <div className="products">
                      {
                        products.results.map((product, index) =>{
                          return(
                            <div key={index} className="item-product">
                              <Link href={"/items/"+product.id}>
                                  <a>
                                  <img src={product.thumbnail} alt="" loading="lazy" />
                                  <div className="details">
                                    <div className="price-container">
                                        <meta itemProp="price" content={product.price} />
                                          <span className="price-tag-symbol" itemProp="priceCurrency">
                                            $
                                          </span>
                                        <span className="price-tag-fraction"> {product.price}</span>
                                    </div>
                                    <h2>{product.title}</h2>
                                  </div>
                                  </a>
                              </Link>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </section>
            </Fragment>
          }
        </div>
    )
}

export default Items