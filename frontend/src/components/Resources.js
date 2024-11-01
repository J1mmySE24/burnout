import * as React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
import Footer from "./Footer";
// import { CardActionArea } from "@mui/material";


const defaultTheme = createTheme();

export default function Resources(props) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(9);

    // const [searchQuery, setSearchQuery] = useState("");
    if(loading || error){
        ;
    }

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            setError(null); 
            try {
                const response = await fetch("/resources");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResources(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

    fetchResources();
}, []);

const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 9); 
  };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            News & Blogs
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Discover a wealth of articles, blogs, and news dedicated to helping you achieve your wellness goals. Stay informed with the latest tips, workouts, nutrition advice, and wellness insights that can help you live a healthier life.
                        </Typography>
                    </Container>
                </Box>
                <Container>

                    {console.log(resources)}
                    <Grid container spacing={4}>
                             {resources.slice(0, visibleCount).map((article, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <CardMedia
                                component="img"
                                image={article.urlToImage || 'default-image-url.jpg'} // Provide a default image URL
                                alt={article.title}
                                sx={{ height: '150px', width: '100%', objectFit: 'cover' }} // Fixed height for images
                            />
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" component="div" noWrap>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        {article.title}
                                    </a>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.description || article.summary}  {/* Use appropriate field */}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Published on: {new Date(article.publishedAt).toLocaleDateString()}  {/* Format date */}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid> 
                {visibleCount < resources.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    onClick={handleShowMore}
                    variant="contained"
                    sx={{
                        backgroundColor: 'orange', 
                        color: '#FFFFFF', 
                        '&:hover': {
                            backgroundColor: '#FFAA3D', 
                        },
                    }}
                >
                    Show More
                </Button>
            </Box>
                        )}
                    </Container>
                <Footer/>
            </main>
        </ThemeProvider>
    );
}
