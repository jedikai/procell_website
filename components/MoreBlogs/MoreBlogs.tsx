import { MoreBlogsWrapper } from "@/styles/StyledComponents/MoreBlogsWrapper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import OurBlogProduct from "../OurBlogProduct/OurBlogProduct";

export default function MoreBlogs({ moreBlogsData, relatedBlogListData }: any) {
  console.log("relatedBlogListData", relatedBlogListData);

  return (
    <MoreBlogsWrapper className="cmn_gap">
      <Container fixed>
        <Typography variant="h2" className="heading">
          More blogs
        </Typography>
        <Box className="more_blog">
          <Grid container spacing={2}>
            {relatedBlogListData?.map((data: any, index: number) => {
              const { related_post_id,
                related_post_author,
                related_post_date,
                related_post_description,
                related_post_title,
                related_post_image
              } = data ?? {};
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index + 1}>
                  <OurBlogProduct
                    Blogesimg={related_post_image}
                    blogesDate={related_post_date ?? ""}
                    blogTitletext={related_post_title ?? ""}
                    blogtext={related_post_description ?? ""}
                    link={`/our-blog/blog-details/${related_post_id}`}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </MoreBlogsWrapper>
  );
}
