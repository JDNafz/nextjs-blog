What is next.js used for?

How is it different than React?

What are the tools it gives you?

Type '
(
	{ params }: 
		{ params: 
			{ slug: string; }; 
		}) => Promise<{ props: { post: Post; }; revalidate: number; }>' 
		
		is not assignable to type 
		'GetStaticProps<BlogPostProps>'.

Types of parameters '\_\_0' and 'context' are incompatible.

Type 'GetStaticPropsContext<ParsedUrlQuery, PreviewData>' 

is not assignable to type 

'{ params: { slug: string; }; }'.

Types of property 'params' are incompatible.

Type 'ParsedUrlQuery | undefined' is not assignable to type 

'{ slug: string; }'.

Type 'undefined' is not assignable to type '{ slug: string; }'.ts(2322)
