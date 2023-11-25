---
layout: page-noformatting
title: Contact me
description: Send me an email or contact me on another platform
image: antique-typewriter.jpg
---


<article id="main">
<section class="wrapper style5">
    <div class="inner">
        <div class = "wrapper align-center">
        <h2>Check me out at any of these places:</h2>
        <ul class="icons major">
			<li><a href="{{site.instagram_url}}" id="icon-button-link"><span id="icon-button" class="icon fa-instagram major style1" style="background:#9CB2AD"><span class="label">Lorem</span></span></a><p><br>Instagram</p>
			</li>
			<li><a href="{{site.github_url}}" id="icon-button-link"><span id="icon-button" class="icon fa-github-square major style1" style="background:#9CB2AD"><span class="label">Ipsum</span></span></a><p><br>Github</p>
			</li>
            <li><a href="{{site.linkedin_url}}" id="icon-button-link"><span id="icon-button" class="icon fa-linkedin-square major style1" style="background:#9CB2AD"><span class="label">Ipsum</span></span></a><p><br>LinkedIn</p>
			</li>
		</ul>
        </div>
    <h2 class="align-center">Or feel free to email me with any questions!<br></h2>
	<form method="post" action="assets/php/contact.php">
		<div class="row uniform">
			<div class="6u 12u$(xsmall)">
				<input type="text" name="contact-name" id="contact-name" value="" placeholder="Name" />
			</div>
			<div class="6u$ 12u$(xsmall)">
				<input type="email" name="contact-email" id="contact-email" value="" placeholder="Email" />
			</div>
            <div class="12u$">
                <textarea name="subject" id="subject" placeholder="Subject" rows="1"></textarea>
            </div>
			<div class="12u$">
				<textarea name="message" id="message" placeholder="Enter your message" rows="6"></textarea>
			</div>
            <div class="6u 12u$(small)">
				<input type="checkbox" id="email-copy" name="email-copy">
				<label for="email-copy">Email me a copy</label>
			</div>
			<div class="6u$ 12u$(small)">
				<input type="checkbox" id="captcha" name="captcha">
				<label for="captcha">Not a robot</label>
			</div>
			<div class="12u$">
				<ul class="actions">
					<li><input type="submit" value="Send Message" class="special" /></li>
					<li><input type="reset" value="Reset" /></li>
				</ul>
			</div>
		</div>
	</form>
    </div>
</section>
</article>
