import * as React from 'react';
import {Page} from 'argo-ui';

const iframe1 = "<iframe src='http://183.111.177.160:3000/d-solo/uXUkKWoMz/new-dashboard-copy?orgId=1&refresh=5s&from=1606785913688&to=1606807513688&theme=light&panelId=6' width='100%' height='200' frameborder='0' />";
const iframe2 = "<iframe src='http://183.111.177.160:3000/d-solo/uXUkKWoMz/new-dashboard-copy?orgId=1&refresh=5s&from=1606785929152&to=1606807529152&theme=light&panelId=2' width='100%' height='200' frameborder='0' />";
const iframe3 = "<iframe src='http://183.111.177.160:3000/d-solo/uXUkKWoMz/new-dashboard-copy?orgId=1&refresh=5s&from=1606785940396&to=1606807540396&theme=light&panelId=10' width='100%' height='200' frameborder='0' />";

const Iframe = (props: { iframe: string; }) => {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:''} } />);
}

export default () => {
    return (
        <Page title='Metric' toolbar={{breadcrumbs: [{title: 'Metric'}]}}>
            <Iframe iframe={iframe1} />
            <Iframe iframe={iframe2} />
            <Iframe iframe={iframe3} />
        </Page>
    );
};