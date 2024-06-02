import { allDocs } from "contentlayer/generated";
import {BlitzPage} from "@blitzjs/next";
import {useStringParam} from "~/src/utils/utils";
import Layout from "~/src/core/layouts/layout";
import {Group, Text, Title} from "@mantine/core";
import React from "react";
import {MdxDocRender} from "~/src/core/components/mdx-render";


export const DocsPage: BlitzPage = () => {
    const slug = useStringParam("slug")
    const doc = allDocs.find((doc) => doc.slug === slug)

    if(!doc) {
        return(
            <>
                {/* @ts-expect-error Server Component */}
                <Layout>
                    <Group>
                        <Title>Doc not found</Title>
                        <Text>Doc with slug {slug} not found</Text>
                    </Group>
                </Layout>
            </>
        )
    }

    return (
        <div>
            <h1>{doc.title}</h1>
            <MdxDocRender doc={doc} />
        </div>
    )
}

export default DocsPage;

