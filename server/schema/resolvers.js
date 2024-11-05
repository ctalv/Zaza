const { AuthenticationError } = require('apollo-server-express');
const { User,  Category, SubCategory, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const { model } = require('mongoose');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {

        user: async (parent, { args, context }) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                  path: 'orders.products',
                  populate: 'subcategory'
                });
        
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        
                return user;
              }
        
              throw new AuthenticationError('Not logged in');
        },

        categories: async () => {
            return await Category.find();
        },

        category: async (parent, { categoryId }) => {
            return await Category.findOne({ _id: categoryId });
        },

        subcategories: async (parent, {category, name}) => {
            const params = {};

            if (category) {
                params.category = category
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await SubCategory.find(params).populate('category');
        },

        subcategory: async (parent, { subcategoryId }) => {
            return await SubCategory.findOne({ _id: subcategoryId }).populate('category');
        },

        products: async (parent, {subcategory, name}) => {

            return await Product.find().populate('subcategory');
        },

        product: async (parent, { productId }) => {
            return await Product.findOne({ _id: productId }).populate('subcategory');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'subcategory'
              });
      
              return user.orders.id(_id);
            }
      
            throw new AuthenticationError('Not logged in');
          },
          checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            await new Order({ products: args.products });
            // eslint-disable-next-line camelcase
            // const line_items = [];
      
            // eslint-disable-next-line no-restricted-syntax
            // for (const product of args.products) {
              const line_items = args.products.map((product) => ({
                // line_items.push({
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      // _id: product._id,
                      name: product.name,
                    },
                    unit_amount: Math.round(product.price * 100),
                  },
                  // stock: product.purchaseQuantity,
                  quantity: product.purchaseQuantity,
                // })
              }));
// );
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`,
            });
      
            return { session: session.id };
          },
        favorite: async (parent, { _id }, context) => {
          if (context.user) {
            const user = await User.findById(context.user._id).populate({
              path: 'favorites.products',
              populate: 'subcategory'
            });
    
            return user.favorites.id(_id);
          }
          },
          productsByCategory: async (parent, { categoryId }) => {
            // Fetch products based on the provided categoryId
            return await Product.find({ "subcategory.category": categoryId }).populate('subcategory');
          },

    },
    Mutation: {
        addUser: async (parent, args ) => {
            const user = await User.create( args );
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
          },
          toggleFavorite: async(parent, { id }, context) => {
              return await Product.findByIdAndUpdate(
                {_id: id},
                [{$set: { isFavorite: { $eq:[false,"$isFavorite"] }}}],
                { new: true }
              )
              
          },
          addFavorite: async (parent, { products }, context) => {
            if (context.user) {
              const product = new Product({ products });

              const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { favorites: product }},
                { $where: { isFavorite: true }},
                { new: true, runValidators: true }
              );

              return product
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeFavorite: async (parent, { products }, context) => {
            if (context.user) {
              const product = new Product({ products });

              const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { favorites: product }},
                { $where: { isFavorite: false }},
                { new: true }
              );

              return product
            }
            throw new AuthenticationError('You need to be logged in!');
          },
  
    }
}

module.exports = resolvers;




// updateProduct: async (parent, { _id, quantity }) => {
//     const decrement = Math.abs(quantity) * -1;

//     return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
//   },

// removeUser: async (parent, { userId }) => {
//     return User.findOneAndDelete({ _id: userId });
// },
//         updateUser: async (parent, args, token, context) => {
            
//             const decoded = jwt.decode( token )

//             const tokenId = decoded.id
                
//                 const updatedUser =  await User.findByIdAndUpdate(tokenId, args, { new: true });

//                 return  updatedUser ;
            
//             // throw new AuthenticationError('Not logged in');
//           },

//         editUser: async (parent, { username, email, password }, { user }) => {
            
//             if (!user) {
//                 throw new AuthenticationError('Not logged in');
//               }
            
//             const updateUser = {};

//             // Check which fields are provided in the request and add them to the update object
//             if (username) {
//                 updateUser.username = username;
//             }
//             if (email) {
//                 updateUser.email = email;
//             }
//             if (password) {
//                 updateUser.password = password;
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: userId },
//                     updateUser,
//                     { password },
//                     // Return the newly updated object instead of the original
//                     { new: true, runValidators: true},

//                 );
//                 const token = signToken(updatedUser);

//                 return { token, updatedUser };
//                 updateUser.password = hashedPassword;
//             }

//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: userId },
//                 updateUser,
//                 // Return the newly updated object instead of the original
//                 { new: true }
//             );

//             const token = signToken(updatedUser);

//             return { token, updatedUser };

//             return updatedUser;
//         },
        

// addCategory: async (parent, { name }) => {
//     return await Category.create({ name });
// },
// addSubCategory: async (parent, { name, category }, context) => {
//     const newSubCategory = await SubCategory.create({ 
//         name, 
//         category: category 
//     });


//     await Category.findOneAndUpdate( 
//         { _id: category },
//         { $addToSet: { subcategories: newSubCategory._id, name } }
//       );

//     return newSubCategory;
// },

// removeCategory: async (parent, { categoryId }) => {
//     return await Category.findOneAndDelete({ _id: categoryId })
// },
// removeSubCategory: async (parent, { subcategoryId }) => {
//     const subcategory = await SubCategory.findOneAndDelete({
//         _id: subcategoryId
//       });

//       await Category.findOneAndUpdate(
//         { _id: subcategoryId.category._id },
//         { $pull: { subcategories: subcategory._id } }
//       );

//       return subcategory;
// }

