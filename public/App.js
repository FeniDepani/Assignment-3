const contentNode = document.getElementById('contents');
const products = [];

const ProductRow = props => /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.product.ProductName), /*#__PURE__*/React.createElement("td", null, "$", props.product.Price), /*#__PURE__*/React.createElement("td", null, props.product.Category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
  href: props.product.ImageUrl,
  target: "_blank"
}, /*#__PURE__*/React.createElement("u", null, "View"))));

function ProductTable(props) {
  const productRows = props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table colmn-width"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.productAdd;
    this.props.createProduct({
      Category: form.category.value,
      Price: parseFloat(form.price.value.slice(1)),
      ProductName: form.productName.value,
      ImageUrl: form.imageUrl.value
    });
    form.category.value = "Shirts";
    form.price.value = "$";
    form.productName.value = "";
    form.imageUrl.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("label", null, "Category")), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("label", null, "Price")), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("select", {
      id: "category",
      className: "form-control"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Shirts",
      defaultValue: true
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), /*#__PURE__*/React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
      value: "Accessories"
    }, "Accessories"))), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "price",
      defaultValue: "$"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6  top-buffer"
    }, /*#__PURE__*/React.createElement("label", null, "Product Name")), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6  top-buffer"
    }, /*#__PURE__*/React.createElement("label", null, "Image URL")), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "productName"
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-6"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "imageUrl"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-sm-10"
    }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-default  top-buffer"
    }, "Add Product")))));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const query = `query{
			productList{
				id Category ProductName Price ImageUrl
			}
		}`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(response => {
      response.json().then(result => {
        this.setState({
          products: result.data.productList
        });
      });
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  createProduct(newProduct) {
    const query = `mutation productAdd($newProduct: ProductInput!) {
			productAdd(product: $newProduct) {
				id
			}
		}`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          newProduct
        }
      })
    }).then(response => {
      this.loadData();
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "main_div"
    }, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("div", {
      className: "table_heading"
    }, "Showing all available products."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement("div", {
      className: "form_heading"
    }, "Add a new product to inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(ProductList, null), contentNode);