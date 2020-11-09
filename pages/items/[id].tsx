import {useState, useEffect, Fragment} from 'react'
import { useRouter } from "next/router";
import Navbar from 'components/Navbar';
import HeadHtml from 'components/Head';
import Breadcrumbs from 'components/Breadcrumbs';

const Item = () => {

    const [product, setProduct] = useState({category_id:'', thumbnail: '', sold_quantity: '', title: '', price:''});
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      fetchData(String(router.query.id));
    }, [])

    useEffect(() => {

    }, [product])

    const fetchData = async (string) => {
        const data = await fetch('https://api.mercadolibre.com/items/'+string)
        const product = await data.json()
        
        const second_data = await fetch('https://api.mercadolibre.com/items/'+string+'/description')
        const description = await second_data.json()
        
        setProduct(product);
        setDescription(description.plain_text);
        setLoading(true);
    }

    return (
        <div>
          <HeadHtml />
          <Navbar />
          {
              loading &&
              <Fragment>
                <Breadcrumbs props={product.category_id} />
                <section>
                    <div className="container-product">
                        <div className="product">
                            <img src={product.thumbnail} alt="" loading="lazy" />
                            <div className="details">
                                <div className="subtitle">
                                    <span className="ui-subtitle">Nuevo  -  {product.sold_quantity} vendidos</span>
                                </div>
                                <h1>{product.title}</h1>
                                <div className="price-container">
                                    <meta itemProp="price" content={product.price} />
                                        <span className="price-tag-symbol" itemProp="priceCurrency">
                                        $
                                        </span>
                                    <span className="price-tag-fraction"> {product.price}</span>
                                </div>
                                <form method="get" >
                                    <button type="submit" className="button-primary">
                                        <span className="button-content">Comprar</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="product-description">
                            <h2>Descripción del producto</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </section>
            </Fragment>
          }
        </div>
        
    )
}

export default Item