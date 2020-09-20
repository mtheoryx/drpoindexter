---
title: "What packages can I use with Python?"
---

```py
import pkg_resources
installed_packages = pkg_resources.working_set
for package in sorted(installed_packages, lambda x: x.key):
    print "{}=={}".format(package.key, package.version)
```
