import * as React from 'react';
import {Page} from 'argo-ui';
import {Consumer} from '../../../shared/context';
import {uiUrl} from '../../../shared/base';

// argo workflows
const iframe1  = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=2" width="450" height="200" frameborder="0" />';
const iframe2 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=16" width="100%" height="200" frameborder="0" />';
const iframe3 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=14" width="100%" height="200" frameborder="0" />';
const iframe4 ='<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=6" width="100%" height="200" frameborder="0" />';
const iframe5 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=12" width="100%" height="200" frameborder="0" />';
const iframe6 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=4" width="100%" height="200" frameborder="0" />';
const iframe7 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=8" width="100%" height="200" frameborder="0" />';
const iframe8 = '<iframe src="https://183.111.177.160:3000/d-solo/ix01wn1Gk/argo-workflow?orgId=1&refresh=5s&theme=light&panelId=10" width="100%" height="200" frameborder="0" />';

// GPU
const gpu1 = '<iframe src="https://183.111.177.160:3000/d-solo/slEY4dsZk/triton-inference-server?orgId=1&refresh=5s&theme=light&panelId=13" width="100%" height="200" frameborder="0" />';
const gpu2 = '<iframe src="https://183.111.177.160:3000/d-solo/slEY4dsZk/triton-inference-server?orgId=1&refresh=5s&theme=light&panelId=9" width="100%" height="200" frameborder="0" />';
const gpu3 = '<iframe src="https://183.111.177.160:3000/d-solo/slEY4dsZk/triton-inference-server?orgId=1&refresh=5s&theme=light&panelId=11" width="100%" height="200" frameborder="0" />';
const gpu4 = '<iframe src="https://183.111.177.160:3000/d-solo/slEY4dsZk/triton-inference-server?orgId=1&refresh=5s&theme=light&panelId=2" width="100%" height="200" frameborder="0" />';

// K8S
const k8s1 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=64" width="100%" height="200" frameborder="0"/>';
const k8s2 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=71" width="100%" height="200" frameborder="0"/>';
const k8s3 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=35" width="100%" height="200" frameborder="0"/>';
const k8s4 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=69" width="100%" height="200" frameborder="0"/>';
const k8s5 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=33" width="100%" height="200" frameborder="0"/>';
const k8s6 = '<iframe src="https://183.111.177.160:3000/d-solo/N9uZBy8Wz/1-kubernetes-cluster-overview?orgId=1&var-node=master-node&var-namespace=argo-events&var-container=eventbus-controller&var-duration=6h&theme=light&panelId=68" width="100%" height="200" frameborder="0"/>';
const Iframe = (props: { iframe: string; }) => {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:''} } />);
}

export default () => {
    return (
        <Consumer>
            {ctx => (
                <Page title='Monitor' toolbar={{breadcrumbs: [{title: 'Monitor',path: uiUrl('workflows')}]}}>
                    <h3>Workflows</h3>
                    <div className='row small-12'>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe1} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe2} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe3} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe4} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe5} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe6} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe7} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={iframe8} />
                        </div>
                </div>

                <h3>GPU</h3>
                    <div className='row'>
                        <div className='columns small-3'>
                            <Iframe iframe={gpu1} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={gpu2} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={gpu3} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={gpu4} />
                        </div>
                    </div>

                    <h3>K8S</h3>
                    <div className='row'>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s1} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s2} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s3} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s4} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s5} />
                        </div>
                        <div className='columns small-3'>
                            <Iframe iframe={k8s6} />
                        </div>
                    </div>

                </Page>
            )}
        </Consumer>
    );
};