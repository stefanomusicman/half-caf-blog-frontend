import Script from "next/script";

const GoogleAnalytics = () => {
    return(
        <>
            <Script
                strategy='afterInteractive'
                src="https://www.googletagmanager.com/gtag/js?id=G-0Y7DDQ7S64"/>

            <Script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0Y7DDQ7S64');
                `}
            </Script>
        </>
    )
}

export default GoogleAnalytics;