import { ChangeEvent, Fragment, useState } from "react";
import { books } from '../data/books';
import { cities } from '../data/cities';

interface IBooks {
    title: string;
    author: string;
}

type ChangeInputElement = ChangeEvent<HTMLInputElement>;

function AutoCompleteSearch(): JSX.Element {
    const [isAutocompleteHidden, setIsAutocompleteHidden] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>('cities');

    const [search, setSearch] = useState({
        text: '',
        suggestions: []
    });

    const onTextChanged = (e: ChangeInputElement): void => {
        const value = e.target.value;
        let suggestions = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");

            if (searchFilter === 'cities') {
                suggestions = cities.filter((item: string) => regex.test(item));
            }
            else {
                suggestions = books.filter((item: IBooks) => regex.test(item?.title));
            }
        }

        setIsAutocompleteHidden(false);

        const updatedSearchState = {text: value, suggestions: suggestions};
        setSearch(updatedSearchState);
    };

    const suggestionSelected = (value: IBooks | string): void => {
        setIsAutocompleteHidden(true);

        const updatedSearchState = {text: typeof value === 'string' ? value : value.title, suggestions: []};
        setSearch(updatedSearchState);
    };

    const resetSearchStates = (value: string) => {
        setSearchFilter(value);
        suggestionSelected('');
    }

    const { text, suggestions } = search;

    return (
        <Fragment>
            <select className="select" value={searchFilter} onChange={(e) => resetSearchStates(e.target.value)}>
                <option value="cities">Search Cities</option>
                <option value="books">Search Books</option>
            </select>

            <h3>Search by: {searchFilter.toUpperCase()}</h3>

            <div>
                <input
                    placeholder="Search cities or books"
                    className="input"
                    value={text}
                    onChange={onTextChanged}
                    type={"text"}
                />
            </div>

            {text && text.length < 3 && <h6 className="message">Minimum three characters are required to search for content</h6>}

            {text && text.length > 2 && suggestions.length < 1 && <h6 className="message">Can't find data for the search criteria</h6>}

            {text.length > 2 && suggestions.length > 0 && !isAutocompleteHidden && (
                <div className="autocomplete">
                    {searchFilter === 'cities' && suggestions.map((item: string, index:  number) => (
                        <div className="item" key={index} onClick={() => suggestionSelected(item)}>
                            <span>{item}</span>
                        </div>
                    ))}

                    {searchFilter === 'books' && suggestions.map((item: IBooks, index:  number) => (
                        <div className="item" key={index} onClick={() => suggestionSelected(item)}>
                            <span>{item.title} ({item.author})</span>
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default AutoCompleteSearch;
