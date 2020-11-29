
import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    function RenderDish({dish}){
        if(dish == null){
            return(
                <div>
                </div>
            );
        }
        return(
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />                    
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    
    function RenderComments({comments, addComment, dishId}){
        if(comments == null){
            return(
                <div>
                </div>
            );
        }
        const showcmnts = comments.map((comment) => {
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        });

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {showcmnts}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }

    const DishDetail = (props) => {
        const dish = props.dish;
        if(dish == null){
            return(
                <div>
                </div>
            );
        }
       
        return(
            <div className="container">
            
                 <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                                    addComment={props.addComment}
                                    dishId={props.dish.id} />
                </div>
            </div>
            
        );
    }
    
    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    
    
    export class CommentForm extends Component {
            constructor(props){
                super(props)

                this.state = {
                    isModalOpen: false
                };

                this.toggleModal = this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            toggleModal() {
                this.setState({ isModalOpen: !this.state.isModalOpen });
            }

            handleSubmit(values){
                this.toggleModal();
                this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>

                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-11">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={3}>Rating: </Label>
                                        <Col md={9}>
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="author" md={3}>Your name: </Label>
                                        <Col md={9}>
                                            <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                            <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={3}>Your feedback: </Label>
                                        <Col md={9}>
                                            <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control" validators={{ required }} />
                                            <Errors className="text-danger" model=".message" show="touched" messages={{ required: 'Required'}} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}


export default DishDetail;