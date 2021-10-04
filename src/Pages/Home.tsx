import React, { FC, FormEvent, useState } from 'react';
import Input from '../components/Input/Input';

interface HomeProps {
    onSearch: (value: string) => void;
}

const Home: FC<HomeProps> = ({ onSearch }) => {
    const [search, setSearch] = useState<string>('');

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        onSearch(search);
        setSearch('');
    };

    return (
        <section className="hero is-medium is-dark has-text-centered is bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-uppercase mb-6">Best free stock photos in one place</h1>
                    <form onSubmit={submitHandler} className="form">
                        <Input
                            value={search}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            placeholder="Search..."
                        />
                        <button className="button is-large is-danger ml-4">Search</button>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default Home;