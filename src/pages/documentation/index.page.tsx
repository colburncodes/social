import React, {useState} from "react"
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

const renderDocData = (docs) => {
    return allDocs.map((doc, index) => (
        <Tabs.Panel value={doc._id} key={doc._id} ml={50}>
            <MdxDocRender doc={doc}/>
        </Tabs.Panel>
    ))
}

const Sidebar = () => {
    const [activeDoc, setActiveDoc] = useState(allDocs[0]?._id);
    const handleTabChange = (value: string) => {
        setActiveDoc(value);
    };
    const sortedDocs = allDocs.sort((a, b) => a.order - b.order);
    return(
        <div className={classes.container}>
            <Tabs defaultValue={activeDoc} onChange={handleTabChange} orientation="vertical">
                <Tabs.List>
                    {renderDocTabs()}
                </Tabs.List>
                {renderDocData(sortedDocs)}
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