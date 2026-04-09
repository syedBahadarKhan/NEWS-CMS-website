import articleModel from '../Models/article.js';
import settingModel from '../Models/setting.js';
import categoryModel from '../Models/category.js';
import NodeCache from 'node-cache';

const myCache = new NodeCache();

const LoadComonData = async (req, res, next) =>{
    try{
       var latestArticle = myCache.get('latestArticlecache')
       var settings  = myCache.get("settingcache")
       var categories = myCache.get("categoriescache")
       
        if(!latestArticle && !settings && !categories){
        settings = await settingModel.findOne().lean()                                

        latestArticle = await articleModel.find()
                                        .populate('category', {'name':1, 'slug':1})
                                        .populate('author', {'fullname':1})
                                        .sort({createdAt:-1}).limit(5).lean()                                

        const categoriesInUse = await articleModel.distinct('category');
        categories = await categoryModel.find({_id: {$in: categoriesInUse}}).lean()

        myCache.set('latestArticlecache', latestArticle, 3600)
        myCache.set('settingcache', settings, 3600)
        myCache.set('categoriescache', categories, 3600)
        }

        res.locals.settings = settings
        res.locals.latestArticle = latestArticle
        res.locals.categories = categories
                        next()
                }catch(err){
                next(err)
                }
}


export default LoadComonData