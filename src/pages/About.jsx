import React from 'react';
import { Link } from 'react-router-dom';

export class About extends React.Component{
    render(){
        return <div className="jumbotron wall">
            <h1>
                We want to solve business challenges with brand strategy & design.
            </h1>
            <p className="text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis placeat necessitatibus ducimus id ut voluptatum dolores deleniti, dolorum tenetur ex, temporibus quod porro sed delectus eius aut iusto saepe dolor.</p>
            <Link className="btn btn-info" to="/contact">Read More</Link>
        </div>
    }
}

export class Contact extends React.Component{
    render(){
        return <div>
            <h1>
                Contact Component
            </h1>
        </div>
    }
}
