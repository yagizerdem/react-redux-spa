import { Link } from 'react-router-dom';
export default function Button({ children, disabled, to, type, onClick }){


    if(to){
        return(
            <Link to={to}>
                {children}
            </Link>
        )
    }
    if(onClick){
        return(
            <div style={type} onClick={onClick} disabled={disabled}>
                {children}
            </div>
        )
    }

    return (
        <button disabled={disabled} style={type}>
          {children}
        </button>
      );

}   