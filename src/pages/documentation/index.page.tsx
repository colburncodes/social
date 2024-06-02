import React from "react"
import {Group, Tabs} from "@mantine/core"
import {BlitzPage} from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import {allDocs, Doc} from "contentlayer/generated";
import {MdxDocRender} from "~/src/core/components/mdx-render";
import classes from '~/src/styles/Settings.module.css';

type DocPageProps = {
    docs: Doc[]
}


const renderDocTabs = () => {
    return allDocs.map((doc) => (
        <Tabs.Tab key={doc._id} value={doc._id}>
            {doc.title}
        </Tabs.Tab>
    ))
}

const renderDocData = () => {
    return allDocs.map((doc, index) => (
        <Tabs.Panel value={doc._id} key={doc._id}>
            <MdxDocRender doc={doc}/>
        </Tabs.Panel>
    ))
}


const Sidebar = () => {

    return(
        <div className={classes.container}>
            <Tabs defaultValue="gallery" orientation="vertical">
                <Tabs.List>
                    {renderDocTabs()}
                </Tabs.List>
                {renderDocData()}
            </Tabs>

        </div>
    )
}


export const DocumentationPage: BlitzPage<DocPageProps> = ({docs}) => {
    return (
        <>
            {/* @ts-expect-error Server Component */}
            <Layout>
                <Group display={"flex"}>
                    <Sidebar/>
                </Group>
            </Layout>
        </>
    )
}

export default DocumentationPage