import React from 'react';
import { shallow } from 'enzyme';
import { Button, Link, TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem, TablePagination } from '@material-ui/core';

describe('SubjectList', () => { 
  let wrapper;
  const rows = [
    { id: 1, title: 'Subject 1', courses: 3, isPublished: true },
    { id: 2, title: 'Subject 2', courses: 5, isPublished: false },
  ];
  const setSearchData = jest.fn();
  const handleChangePage = jest.fn();
  const handleChangeRowsPerPage = jest.fn();
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <SubjectList
        rows={rows}
        loading={false}
        searchData=''
        setSearchData={setSearchData}
        page={0}
        rowsPerPage={5}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  });

  it('should render a button to add a subject', () => {
    expect(wrapper.find(Button).find(Link).prop('href')).toEqual('/subject/add-subject');
  });

  it('should render a text field for searching', () => {
    expect(wrapper.find(TextField).prop('name')).toEqual('search');
    expect(wrapper.find(TextField).prop('value')).toEqual('');
    expect(wrapper.find(TextField).prop('label')).toEqual('Search');
    wrapper.find(TextField).simulate('change', { target: { value: 'test' } });
    expect(setSearchData).toHaveBeenCalledWith('test');
  });

  it('should render a table with subject data', () => {
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableHead).find(TableRow).find(TableCell).at(0).text()).toEqual('Title');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableHead).find(TableRow).find(TableCell).at(1).text()).toEqual('Courses');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableHead).find(TableRow).find(TableCell).at(2).text()).toEqual('Status');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableHead).find(TableRow).find(TableCell).at(3).text()).toEqual('');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow)).toHaveLength(2);
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow).at(0).find(TableCell).at(0).text()).toEqual('Subject 1');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow).at(0).find(TableCell).at(1).text()).toEqual('3 Courses');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow).at(0).find(TableCell).at(2).text()).toEqual('Published');
    expect(wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow).at(0).find(TableCell).at(3).find(IconButton).find(MoreVertIcon)).toHaveLength(1);
    wrapper.find(TableContainer).find(Paper).find(Table).find(TableBody).find(TableRow).at(0).find(TableCell).at(3).find(IconButton).simulate('click');
    expect(wrapper.find(Menu).prop('anchorEl')).not.toBeNull();
    wrapper.find(Menu).find(MenuItem).at(0).simulate('click');
    expect(handleEdit).toHaveBeenCalled();
    wrapper.find(Menu).find(MenuItem).at(1).simulate('click');
    expect(handleDelete).toHaveBeenCalled();
  });

  it('should render a loading spinner when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(CommonLoading)).toHaveLength(1);
  });

  it('should render a message when there is no data available', () => {
    wrapper.setProps({ rows: [] });
    expect(wrapper.find(TableBody).find(TableRow).find(TableCell).prop('colSpan')).toEqual(4);
    expect(wrapper.find(TableBody).find(TableRow).find(TableCell).text()).toEqual('No Data Available');
  });

}
  
  