import React from 'react';
import { Image, Menu, Dropdown, Button, Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const style = {
    padding: '7px 17px',
    backgroundColor: '#e0e1e2',
    color: 'white !important',
    border: '0.5px solid white'
}

const header = (props) => {
    return (

        <Menu stackable>
            <Menu.Item>
                <Image size='tiny' src='/images/logo.jpg' />
            </Menu.Item>

            <Menu.Menu position='right'>

                {props.isAuthenticated ? (<Menu.Item>
                    <Button onClick={() => props.logout()}>
                        Se déconnecter
                    </Button>
                </Menu.Item>) : ([<Menu.Item key={0}>
                    <Form>
                        <Input type="password" value={props.password} onChange={(e) => props.handleChange(e)} placeholder="Entrez mot de passe..." size="mini" />
                    </Form>
                </Menu.Item>, <Menu.Item key={1}>
                    <Button onClick={() => props.login()}>
                        Se connecter
                    </Button>
                </Menu.Item>])}

                <Menu.Item>
                    <Image
                        src='/images/logo.jpg'
                        size='tiny'
                    />
                </Menu.Item>
                <Menu.Item>
                    <Dropdown
                        icon='sidebar'
                        button
                        className='icon'
                    >
                        <Dropdown.Menu>
                            <div style={style}>
                                <Link to={'/'}> Caisse enregistreuse</Link>
                            </div>
                            <div style={style}>
                                <Link to={'/all-orders'}>Commandes non payées</Link>
                            </div>
                            {props.isAuthenticated ? ([
                            <div style={style} key={3}>
                                <Link to={'/all-graphs'}>Tableau de bord</Link>
                            </div>,
                            <div style={style} key={4}>
                                <Link to={'/category-admin'}>Gestion des catégories</Link>
                            </div>,
                            <div style={style} key={5}>
                                <Link to={'/create-product'}>Ajouter produit</Link>
                            </div>,
                            <div style={style} key={6}>
                                <Link to={'/all-products'}>Mettre à jour produit</Link>
                            </div>,
                            <div style={style} key={7}>
                                <Link to={'/all-stocks'}>Gestion des stocks</Link>
                            </div>

                            ]) : ("")}

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

            </Menu.Menu>
        </Menu>
    );
};

export default header;