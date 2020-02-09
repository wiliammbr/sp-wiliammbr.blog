// The code in this file helps me on improving SEO for my Blog inside the Theme Header file.

<?php if ( is_home() ) : ?>
  <h1 style="display: none;">WILIAMMBR</h1>
<?php endif; ?>

<?php if ( ( is_archive() ) ) : ?>
  <meta name="description" content="Here you find posts with <?php echo get_the_archive_title(); ?>">
  <h1 style="display: none;"><?php echo get_the_archive_title(); ?></h1>
<?php endif; ?>

<?php if ( ( is_search() ) ) : ?>
  <meta name="description" content="Here you find posts with <?php echo get_search_query(); ?>">
  <h1 style="display: none;">Search <?php echo get_search_query(); ?></h1>
<?php endif; ?>
