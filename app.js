defineM("img-lazy-load", function(g, mbrApp, tr) {
    mbrApp.regExtension({
        name: "img-lazy-load",
        events: {
            load: function() {
				var a = this;
				
				// On publish, remove (most) references to Mobirise
                a.addFilter("publishHTML", function(b) {
					var c = a.projectSettings["img-lazy-load"] || false;

					if (c) {
                        b = b.replaceAll('<img', '<img loading="lazy"')
					}

					return b
				});

				// Add site settings
				a.addFilter("sidebarProjectSettings",function(b){
					var wl = a.projectSettings["img-lazy-load"] || "";

					var c = {
						title:"img-lazy-load",
						name:"img-lazy-load",
						html:[
							'<div class="form-group col-md-12">',
							'  <div class="row">',
							'    <label for="img-lazy-load" class="control-label col">Lazy Load Images</label>',
							'    <div class="togglebutton col-auto">',
							'      <label>',
							'        <input type="checkbox" name="img-lazy-load" id="img-lazy-load" ' + (wl ? "checked" : "") + '>',
							'        <span class="toggle" style="margin:0;"></span>',
							'      </label>',
							'    </div>',
							'  </div>',
							'</div>'
						].join("\n")
					};
					b.push(c);
					return b
				});

				mbrApp.$body.on("change", "#img-lazy-load", function() {
					if (!$("#img-lazy-load").prop("checked")) {
						a.projectSettings["img-lazy-load"] = false;
					}
				});
			}
        }
    })
}, ["jQuery", "mbrApp", "TR()"]);