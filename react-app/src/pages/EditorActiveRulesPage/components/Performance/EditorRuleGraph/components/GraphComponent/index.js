import React from 'react';
import Graph from 'react-graph-vis';
import variables from '../../../../../../../../variables.module.scss';
import commonStyles from '../../../../../../../common/styles/styles.module.scss';
import PropTypes from 'prop-types';

const options = {
    layout: {
        hierarchical: {
            direction: 'UD',
            sortMethod: 'directed',
            nodeSpacing: 200
        },
        improvedLayout: false
    },
    nodes: {
        color: {
            border: variables.darkBlueColor,
            background: variables.backgroundColor,
            highlight: {
                background: variables.borderColor
            }
        },
        font: {
            color: variables.whiteColor
        },
        shape: 'box'
    },
    edges: {
        color: variables.whiteColor,
    },
    physics: {
        enabled: false
    }
};

const GraphComponent = ({graphData}) => {
    const {graph, events} = graphData;

    return <>
        <div className={commonStyles.elementsContainer}>
            <Graph graph={graph} options={options} events={events} style={{height: '640px', width: '100%'}}/>
        </div>
    </>;
};

GraphComponent.propTypes = {
    graphData: PropTypes.object
};

export default GraphComponent;
