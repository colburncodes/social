import Head from "next/head";
import React from "react";
import {APP_DEFAULT_URL, APP_FULL_TITLE, APP_NAME, isDev} from "~/src/config";


type MetaTagProps = {
    url?: string;
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
}

export const MetaTagHead: React.FC<MetaTagProps> = ({
url= APP_DEFAULT_URL,
title= APP_FULL_TITLE,
description = APP_FULL_TITLE,
favicon = '/favicon.ico',}) => {
    return(
        <Head>
            <title>{isDev ? '🔴 ' : ''}{title}</title>
            <link rel="icon" href="/favicon.ico"/>

            <meta name="title" content={title}/>
            <meta name="description" content={description}/>
            {/* meta */}
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>

            {/* twitter */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={description}/>
        </Head>
    )
}

export default MetaTagHead;