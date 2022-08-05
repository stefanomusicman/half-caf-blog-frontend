import styles from './RecentPosts.module.css';
import Title from '../../Title/Title';
import BlogCard from '../../BlogCard/BlogCard';

const RecentPosts: React.FC<{data: any}> = ({data}) => {
    return(
        <div className={styles.contentBox}>
            <Title title="Recent Posts"/>
            <div className={styles.primaryBodyContainer}>
                <BlogCard introText={data[0].attributes.cardText}
                        image={data[0].attributes.cardPhoto.data.attributes.url}
                        key={data[0].id}
                        id={data[0].id} 
                        title={data[0].attributes.title}
                        dateCreated={data[0].attributes.createdAt}
                        category={data[0].attributes.category.data.attributes.name}/>
                <BlogCard introText={data[1].attributes.cardText}
                        image={data[1].attributes.cardPhoto.data.attributes.url}
                        key={data[1].id}
                        id={data[1].id} 
                        title={data[1].attributes.title}
                        dateCreated={data[1].attributes.createdAt}
                        category={data[1].attributes.category.data.attributes.name}/>
            </div>
        </div>
    )
}

export default RecentPosts;