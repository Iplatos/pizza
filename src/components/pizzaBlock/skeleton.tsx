import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = (props: any) => (
  <div className="pizzaBlockWrapper">
    <div className="pizza-block">
      <ContentLoader
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="295" y="110" rx="3" ry="3" width="88" height="6" />
        <rect x="-21" y="306" rx="3" ry="3" width="280" height="85" />
        <rect x="-20" y="408" rx="3" ry="3" width="280" height="47" />
        <rect x="-21" y="267" rx="3" ry="3" width="280" height="25" />
        <circle cx="120" cy="120" r="120" />
      </ContentLoader>
    </div>
  </div>
)
