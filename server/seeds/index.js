const connection = require('../config/connections');
const { User, Category, SubCategory, Product, } = require('../models');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json')
const subCategoryData = require('./subCategoryData.json')
const fragranceData = require('./frangrancesData.json')

connection.on('error', (err) => err);

connection.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userData);

    await Category.deleteMany();
    await SubCategory.deleteMany();

    const categories = await Category.create(categoryData);

    for (let i = 0; i < subCategoryData.length; i++) {
         console.log(i, subCategoryData[i]) 
         
      if (i < 12) {
        // lingerie
        subCategoryData[i].category = categories[0]._id
      } else {
        // fragrances
        subCategoryData[i].category = categories[1]._id
    }
  }
    const subcategories = await SubCategory.insertMany(subCategoryData)

    // function getRandomSubcategoryLingerie() {
    //   return Math.floor(Math.random() * 12); 
    // }
    // function getRandomSubcategoryFragrance() {
    //   return Math.floor(Math.random() * (subCategoryData.length - 12 + 1 ) + 12); 
    // }

    await Product.deleteMany();


    // seed fragrance products
    for (let i = 0; i < fragranceData.length; i++) {
      console.log(i, fragranceData[i].name)   

      fragranceData[i].category = categories[0]

      if (fragranceData[i].name.includes('Oil')) {
        fragranceData[i].subcategory = subcategories[0]
      } else if ((fragranceData[i].name.includes('Body') || fragranceData[i].name.includes('Shower')) && fragranceData[i].name.includes('Wash')) {
        fragranceData[i].subcategory = subcategories[1]
      } else if (fragranceData[i].name.includes('Parfum')) { 
        fragranceData[i].subcategory = subcategories[2]
      } else if (fragranceData[i].name.includes('Hand') && fragranceData[i].name.includes('Wash')) {
        fragranceData[i].subcategory = subcategories[3]
      } else if (fragranceData[i].name.includes('Hand') && (fragranceData[i].name.includes('Lotion') || fragranceData[i].name.includes('Cream'))) {
        fragranceData[i].subcategory = subcategories[4]
      }  else if (fragranceData[i].name.includes('Candle')) { 
        fragranceData[i].subcategory = subcategories[5]
      }  else if (fragranceData[i].name.includes('Diffuser')) { 
        fragranceData[i].subcategory = subcategories[6]
      }  else if (fragranceData[i].name.includes('Spray')) { 
        fragranceData[i].subcategory = subcategories[7]
      }  else {
        fragranceData[i].subcategory = subcategories[8]
      }
      // fragranceData[i].subcategory = subcategories[getRandomSubcategoryFragrance()]
    }

    await Product.insertMany(fragranceData);


    console.log('all done!');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

});
