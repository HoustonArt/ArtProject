"""file to implement art database and provide functionality to change and search database.  Will also provide function to readout database.  Database will contain metadata on each artist and art piece.  We will use the sqlite database since that is build into python.  Images will not be stored in the database, but their file locations will be.

    We will store no lists, rather we can use SQL queries to get for example all works with a specific author.
    
    Also don't need numworks, can generate this from SQL query
    
    Many functions from:
    http://sebastianraschka.com/Articles/2014_sqlite_in_python_tutorial.html
    
    Each individual file will be kept as part of the database and again retrieved through sql queries.  The mainfile will be a boolean
    
    Keywords will be kept as comma deliminated single string
    
"""
import sqlite3


def connect(sqlite_file):
    """ Make connection to an SQLite database file """
    conn = sqlite3.connect(sqlite_file)
    c = conn.cursor()
    return conn, c

def close(conn):
    """ Commit changes and close connection to the database """
    # conn.commit()
    conn.close()

def total_rows(cursor, table_name, print_out=False):
    """ Returns the total number of rows in the database """
    c.execute('SELECT COUNT(*) FROM {}'.format(table_name))
    count = c.fetchall()
    if print_out:
        print('\nTotal rows: {}'.format(count[0][0]))
    return count[0][0]

def table_col_info(cursor, table_name, print_out=False):
    """
       Returns a list of tuples with column informations:
      (id, name, type, notnull, default_value, primary_key)
    
    """
    c.execute('PRAGMA TABLE_INFO({})'.format(table_name))
    info = c.fetchall()

    if print_out:
        print("\nColumn Info:\nID, Name, Type, NotNull, DefaultVal, PrimaryKey")
        for col in info:
            print(col)
    return info

def values_in_col(cursor, table_name, print_out=True):
    """ Returns a dictionary with columns as keys and the number of not-null
        entries as associated values.
    """
    c.execute('PRAGMA TABLE_INFO({})'.format(table_name))
    info = c.fetchall()
    col_dict = dict()
    for col in info:
        col_dict[col[1]] = 0
    for col in col_dict:
        c.execute('SELECT ({0}) FROM {1} WHERE {0} IS NOT NULL'.format(col, table_name))
        # In my case this approach resulted in a better performance than using COUNT
        number_rows = len(c.fetchall())
        col_dict[col] = number_rows
    if print_out:
        print("\nNumber of entries per column:")
        for i in col_dict.items():
            print('{}: {}'.format(i[0], i[1]))
    return col_dict

def add_artist(c,id, firstN,lastN,lCity,lState,media,profilePic,desc):
    insert_string = "INSERT INTO ARTISTS (id,firstName,lastName,media,profilePic,description, locationCity,locationState) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')"
   
    c.execute(insert_string.format(id, firstN,lastN,media,profilePic,desc,lCity,lState))
   

def add_artist_table(c):
    c.execute('create table Artists (id String Primary Key)')
    for i in ['firstName','lastName','locationCity','locationState','media','profilePic','description']:
        c.execute("ALTER TABLE Artists ADD COLUMN '{0}' String"\
        .format(i))
   
   
def add_work_table(c):
    c.execute('create table Works (id String Primary Key)')
    for i in ['name', 'price', 'description', 'keywords','file']:
        c.execute("ALTER TABLE Works ADD COLUMN '{0}' String"\
        .format(i))

if __name__ == '__main__':

    sqlite_file = 'artDatabase'

    conn, c = connect(sqlite_file)
    #add_artist(c,'1', 'Cynthia','Wisener','Houston','Texas','Sculpture','profile_1.jpg','Houston Artist')
    for table_name in ['Artists','Works']:
        print('Table Name : {0}'.format(table_name))
        total_rows(c, table_name, print_out=True)
        table_col_info(c, table_name, print_out=True)
        values_in_col(c, table_name, print_out=True) # slow on large data bases
        print(''.join('$' for i in range(20)))

    close(conn)