import { useState, useEffect, Fragment } from "react";

const Breadcrumbs = (props) =>{

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData(String(props.props));
      }, [])
      
      const fetchData = async (string) => {
          const third_data = await fetch('https://api.mercadolibre.com/categories/'+string)
          const categories = await third_data.json()
          setCategories(categories.path_from_root);
          setLoading(true);
      }

    return(
        <section>
            {
            loading &&
                <Fragment>
                    <div className="Breadcrumbs">

                        {
                            (categories && categories.length > 0) &&
                            <p>
                                {
                                    categories.map((cat, i) => cat.name + " > ")
                                }
                            </p>
                        }
                    </div>
                </Fragment>
            }   
        </section>
    )
}

export default Breadcrumbs;