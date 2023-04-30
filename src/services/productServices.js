const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');


class ProductServices{

  constructor(){
    this.products = [];
    this.generate(); /// CADA QUE CREEMOS UNA INSTANCIA NUEVA NOS VA A GENERAR LOS PRODUCTOS
    //por esos ponemos este atributo al constructor...
  }

  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.products.push(newProduct);

    return newProduct;
  }

  async find(){
    return this.products;
  }

  async findOne(id)
  {
    const productFindOne = this.products.find(item => item.id == id);
    if (!productFindOne)
    {
      throw boom.notFound('Product not found...')
    }
    if(productFindOne.isBlock)
    {
        throw boom.conflict('This product is blocked for you...')
    }
    else{
      return this.products.find(item => item.id === id);
    }

  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1)
    {
      throw boom.notFound('Product not found...');
    }

    //this.products[index]= changes; ------> De esta forma estamos asignando todos los valores y borrando los demás...
    const product = this.products[index];

    this.products[index]= {
      ...product, //Que persista la información anterior
      ...changes //añadir la nueva
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1)
    {
      throw boom.notFound('Product not found...')
    }
    this.products.splice(index, 1);
    return {message : true, id }
  }
}

module.exports = ProductServices;
