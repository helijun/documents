import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import * as Pages from './src/js/router.config';

import { 
    NavBar, 
    Container,
    OffCanvas,
    OffCanvasTrigger,
    Button,
    List
} from './src/js/common.config';
import ViewInfoConfig from './src/js/view.info.config';
import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';
import './src/scss/common.scss';

let {
    NotFound,
    Index,
    ...Components
} = Pages;

//可做页面权限拦截
const handleOnEnter = function(){
    console.log('all of the views',Components)
}

class Page extends React.Component {
    constructor(){
        super();
        this.state = {
            defaultOffCanvasActive: false
        };
    }

    changeCanvasActive() {
        this.setState({
            defaultOffCanvasActive: true
        })
    }
    
    clickHandler(data, event) {
        if(data.icon === 'left-nav'){
            event.preventDefault();
            window.history.back();
        }else{
            
        }
    }

    render() {
        let componentName = this.props.params.componentName;
        let viewInfo = ViewInfoConfig[componentName];
        
        console.log('ViewInfoConfig', ViewInfoConfig);
        console.log('viewInfo', viewInfo);
       
        
        if(componentName){
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        }
        let Component = Components[componentName] || NotFound;

        return (
            <Container >  
                <Component scrollable history={this.props.history} location={this.props.location}/>
            </Container >
            
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        let {
            location,
            params,
            children,
            ...props
            } = this.props;

        return (
            <Container direction="column">
                <Container fill={true}>
                    {React.cloneElement(children, {key: location.key, params: params, location: location})}
                </Container>
            </Container>
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route 
                    path=":componentName" 
                    component={Page} 
                    onUpdate={() => window.scrollTo(0, 0)}
                    onEnter={handleOnEnter}/>
            </Route>
        </Router>
        , document.getElementById('root'));
})
