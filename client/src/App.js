import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root : {
    width: '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  }, 
  progress : {
    margin : theme.spacing.unit * 2
  }
})
/*
1. constructor()

2. componentWillMount()

3. render()

4. componentDidMount

props or state => shouldCompoentUpdate()

*/

 //const customers = [
//   {
//   'id' : '1',
//   "image" : 'https://placeimg.com/64/64/1',
//   'name' : '홍길동',
//   'birthday' : '12345678', 
//   'gender' : '남자',
//   'job' : '대학생'
// },
// {
//   'id' : '2',
//   "image" : 'https://placeimg.com/64/64/2',
//   'name' : '나나나',
//   'birthday' : '6666', 
//   'gender' : '남자',
//   'job' : '대학생'
// },
// {
//   'id' : '3',
//   "image" : 'https://placeimg.com/64/64/3',
//   'name' : '하하하',
//   'birthday' : '77777', 
//   'gender' : '남자',
//   'job' : '대학생'
// }
 //]

class App extends Component {

  state = {
    customers : "",
    completed : 0
  }

  constructor(props){
    super(props);


  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
    }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed + 1 })
  }

  render(){
    const { classes } = this.props; 
    return (
      <div>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>아이디</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.state.customers ? this.state.customers.map(c => { 
            return ( <Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} /> ); 
            }) : 
            <tableRow>
              <tableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </tableCell>
            </tableRow>
          }      
        </TableBody>
        </Table>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="gray-background">
//       <img src = {logo} lat="logo" />
//       <h2>Let's develop management system!</h2>
//     </div>
//   );
// }

export default withStyles(styles)(App);
