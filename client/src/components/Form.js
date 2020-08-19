import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { TiTimes } from 'react-icons/ti';

const FormTemplate = ({data, addInput}) => {
    // const params = useParams()
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState(``)
    const [title, setTitle] = useState(``)
    const [overview, setOverview] = useState(``)
    const [popularity, setPopularity] = useState(0)
    const [poster_path, setPosterPath] = useState(``)

    useEffect(() => {
        // console.log(data, `ini di useEffect`)
        if (data) {
            setTitle(data.title)
            setTags(data.tags)
            setOverview(data.overview)
            setPopularity(data.popularity)
            setPosterPath(data.poster_path)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        setTags(tags.concat(tag))
        setTag(``)
    }

    const handleDeleteTask = (deleteTag) => {
        setTags(tags.filter(tag => tag !== deleteTag))
    }

    const handleChange = (e) => {
        setTag(e.target.value)
    }

    const handleForm = () => {
        const tagString = tags.join(`,`)
        const formInput = {
            title,
            overview,
            poster_path,
            popularity,
            tags: tagString
        }
        return addInput(formInput)
    }
    return (
        <>
            <Form>
                <FormGroup>
                    <Label>Title</Label>
                    <Input onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    value={title} 
                    placeholder="e.g: Captain America"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Overview</Label>
                    <Input onChange={(e) => setOverview(e.target.value)}
                    type="textarea" 
                    value={overview} 
                    placeholder="e.g: This story is about..." />
                </FormGroup>
                <FormGroup>
                    <Label>Popularity</Label>
                    <Input onChange={(e) => setPopularity(Number(e.target.value))}
                    type="number" 
                    value={popularity} 
                    placeholder="fill with value between 0 to 10" min="0" max="10" step="0.1"/>
                </FormGroup>
                <FormGroup>
                    <Label>Poster URL</Label>
                    <Input onChange={(e) => setPosterPath(e.target.value)} 
                    value={poster_path} 
                    type="url" placeholder="e.g: https://address.com/img/.jpg"/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                </FormGroup>
            </Form>
            <Label>Tags</Label>
            <div className="my-3">
                {
                    tags.map((tag, idx) => (
                        <span key={idx} className="tagStyle" style={{paddingLeft: '20px'}}>{tag} 
                            <Button color="transparent" onClick={() => handleDeleteTask(tag)}><TiTimes/></Button>
                        </span>
                        ))
                    }
            </div>
            <Form onSubmit={(e) => handleSubmit(e)} inline>
                <Input onChange={(e) => handleChange(e)} type="text" value={tag} placeholder="e.g: comedy"/>
                <Button className="ml-3" size="md" color="dark">Add tag</Button>
            </Form>
            <Button color="info" className="mt-4" size="md" block onClick={() => handleForm()}>Submit</Button>
        </>
    )
}

export default FormTemplate