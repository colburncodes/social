import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';
import { emotionCache } from '~/emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import {createGetInitialProps} from "@mantine/emotion";

const stylesServer = createEmotionServer(emotionCache);

export default function Document  () {
    return (
        <Html lang="en">
            <Head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = createGetInitialProps(
    NextDocument,
    stylesServer
);




