import React from 'react'

import Header from './Header'

const Base = props =>(
    <div>
        <Header></Header>
        <section>
            {props.children}
        </section>
    </div>
)

export default Base;
