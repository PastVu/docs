import React, {type ReactNode} from 'react';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {translate} from '@docusaurus/Translate';

type DataWrapperChartProps = {
  title: string;
  chartId: string;
}

if (ExecutionEnvironment.canUseEventListeners) {
    // iframe resize snippet https://developer.datawrapper.de/docs/responsive-iframe#constructing-a-responsive-embed-code
    window.addEventListener('message', function(event) {
        if (typeof event.data['datawrapper-height'] !== 'undefined') {
            var iframes = document.querySelectorAll('iframe');
            for (var chartId in event.data['datawrapper-height']) {
                for (var i = 0; i < iframes.length; i++) {
                    if (iframes[i].contentWindow === event.source) {
                        var iframe = iframes[i]
                        iframe.style.height = event.data['datawrapper-height'][chartId] + 'px';
                    }
                }
            }
        }
    });
}


const MyComponent = () => {
  return (
    <BrowserOnly>
      {() => <span>page url = {window.location.href}</span>}
    </BrowserOnly>
  );
};

export function DataWrapperChart ({
    title,
    chartId
}: DataWrapperChartProps): JSX.Element {
    const {colorMode} = useColorMode();
    const darkSuffix = colorMode === 'dark' ? '?dark=true' : '';
    const areaLabel = translate({ id: 'datawrapper.iframe.label', message: "{title} chart"}, {title: title});
    return (
        <p className={styles.DataWrapperChart}>
            <iframe title={title} aria-label={areaLabel} id={`datawrapper-chart-${chartId}`} src={`https://datawrapper.dwcdn.net/${chartId}/${darkSuffix}`} scrolling="no" frameBorder="0" width="100%" height="420" data-external="1"></iframe>
        </p>
    )
}
