import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './useeffectex.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
  MenuItem,
  TablePagination, // Import TablePagination from Material-UI
} from '@mui/material';

const CustomTable = styled(Table)(({ theme }) => ({
  minWidth: 950,
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root': {
    borderBottom: '1px solid black',
  },
}));

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const Useeffectex = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Page index, starting from 0
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  const fetchData = async () => {
    try {
      let response = await axios.get(apiUrl);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetching data: ', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string(),
  });

  const handleSearch = (values) => {
    const { searchTerm } = values;
    if (searchTerm === '') {
      setFilteredData(null); // Reset filtered data if search term is empty
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handlePageChange = (event, newPage) => {
    console.log("new page",newPage)
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    console.log("items in page",event.target.value)
    setItemsPerPage(event.target.value);
    setCurrentPage(0); 
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredData || data;

  return (
    <>
      <h3>Api Fetching example</h3>
      <Formik
        initialValues={{
          searchTerm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ handleChange, values }) => (
          <Form>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="searchTerm"
                  label="Search by Title"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleSearch({ searchTerm: e.target.value });
                  }}
                  value={values.searchTerm}
                />
                <Button
    variant="contained"
    color="primary"
    startIcon={<SearchIcon />}
    onClick={() => {
      // Add your search logic here if needed
    }}
  >
    Search
  </Button>
              </Grid>
              
            </Grid>
          </Form>
        )}
      </Formik>

      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <CustomTable>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(itemsToDisplay.slice(startIndex, endIndex) || []).map((item) => (
                <CustomTableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </CustomTable>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
            component="div"
            count={itemsToDisplay.length}
            rowsPerPage={itemsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </>
  );
};

export default Useeffectex;
