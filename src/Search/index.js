import React, { Component } from "react";
import { Card, CardTitle, CardText, Input } from 'reactstrap';
import "./style.css";

import userList from "./mockResponse.json";

class Search extends Component {
  state = {
    search: "",
    itemList: null
  };


  onchange = e => {
    const search = e.target.value;
    
    if (!search) {
        this.setState({ 
            search: "",
            itemList: null
        });
        return;
    }

    const filteredUsers = userList?.map(item => {
        if (item.id.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return {...item, id: item.id.replace(new RegExp( '(' + search + ')', 'gi' ), '<span className="primary">$1</span>')}
        }
        if(item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return {...item, name: item.name.replace(new RegExp( '(' + search + ')', 'gi' ), '<span className="primary">$1</span>')}
        }
        if(item.address.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return {...item, address: item.address.replace(new RegExp( '(' + search + ')', 'gi' ), '<span className="primary">$1</span>')}
        }
        if(item.pincode.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return {...item, pincode: item.pincode.replace(new RegExp( '(' + search + ')', 'gi' ), '<span className="primary">$1</span>')}
        }
    }).filter(item2 => item2);


    this.setState({ 
        search: e.target.value,
        itemList: filteredUsers
    });
  };

  render() {
    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <h5 className="text-center">Simple User Search Integration</h5>
            <div className="row">
              <div className="">
                <Input
                  placeholder="Search Users by ID, Name, Address, Pincode"
                  onChange={this.onchange}
                />
              </div>
              <div className="col" />
            </div>
            <div className="searchbox">
                <div className="row">
                    {(this?.state?.itemList && this?.state?.itemList.length) ? this?.state?.itemList.map((item, key) => (
                        <div key={key} style={{ marginTop: "0px" }} className="cardItem">
                            <Card body outline>
                                <CardTitle><b dangerouslySetInnerHTML={{__html: item.id}}></b></CardTitle>
                                <CardTitle><i dangerouslySetInnerHTML={{__html: item.name}}></i></CardTitle>
                                <CardText dangerouslySetInnerHTML={{__html: (item.address + ', ' + item.pincode)}}></CardText>
                            </Card>
                        </div>
                    )) : (
                        this.state.search && (<div className="">
                            <Card body outline>
                                <CardTitle className="text-center no-result"><b>No User Found</b></CardTitle>
                            </Card>
                        </div>)
                    )}
                </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Search;
