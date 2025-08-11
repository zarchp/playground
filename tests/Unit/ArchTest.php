<?php

declare(strict_types=1);

arch()->preset()->php();
arch()->preset()->security()->ignoring('shuffle');
arch()->preset()->laravel();
// arch()->preset()->strict();
